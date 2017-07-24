<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Denyo App Portal - @yield('title')</title>
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/assets/lib/stroke-7/style.css"/>
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/assets/lib/jquery.nanoscroller/css/nanoscroller.css"/>
	<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
    <link rel="stylesheet" type="text/css" href="{{url('/')}}/assets/lib/jquery.vectormap/jquery-jvectormap-1.2.2.css"/>
	<link rel="stylesheet" type="text/css" href="{{url('/')}}/assets/lib/datatables/css/dataTables.bootstrap.min.css"/>

	<link rel="stylesheet" type="text/css" href="{{url('/')}}/assets/lib/datetimepicker/css/bootstrap-datetimepicker.min.css"/>
	<link rel="stylesheet" type="text/css" href="{{url('/')}}assets/lib/select2/css/select2.min.css"/>
    <link rel="stylesheet" type="text/css" href="{{url('/')}}assets/lib/bootstrap-slider/css/bootstrap-slider.css"/>
    
    <link rel="stylesheet" href="{{url('/')}}/assets/css/style.css" type="text/css"/>
	<link type="text/css" href="{{url('/')}}/assets/css/themes/theme-sunrise.css" rel="stylesheet">
	<style type="text/css">
.tree{margin:0 auto;display:table;text-align:center;color:#5b5b5b;}
.tree img{border:3px solid #025e8d;border-radius:45px;width:90px;height:90px;}
.cycle1{margin:0 auto 30px;width:57%;display:inline-block;}
.parent{padding-bottom:26px;position:relative;border-bottom:1px solid #e4e4e4;width:65%;margin:0 auto;}
.child1, .child2{position:relative;padding-top:55px;}
.child1:before, .child2:before{background:#d6d7d9;content:"";height:45px;left:50%;position:absolute;top:0;width:1px;}
.child1{float:left;}
.child2{float:right;}
.tree h3{font-size:16px;color:#5b5b5b;font-weight:400;margin:7px 0 5px 0;}
.tree h4{font-size:16px;color:#5b5b5b;font-weight:300;margin:0;}
.parent-text, .child-text{margin-bottom:30px;}
.parent-text:after{background:#d6d7d9;content:"";height:45px;left:50%;position:absolute;bottom:0;width:1px;}
.tree ul {
	padding-top: 20px; position: relative;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}
.tree li {
	float: left; text-align: center;
	list-style-type: none;
	position: relative;
	padding: 20px 10px  0 10px;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}
.tree li ul {
    padding-left:0px;
}
/*We will use ::before and ::after to draw the connectors*/
.tree li:before, .tree li:after{
	content: '';
	position: absolute; top: 0; right: 50%;
	border-top: 1px solid #ccc;
	width: 50%; height: 20px;
}
.tree li:after{
	right: auto; left: 50%;
	border-left: 1px solid #ccc;
}
/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child:after, .tree li:only-child:before {
	display: none;
}
/*Remove space from the top of single children*/
.tree li:only-child{ padding-top: 0;}
/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before, .tree li:last-child::after{
	border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/
.tree li:last-child:before{
	border-right: 1px solid #ccc;
	border-radius: 0 0 0 0;
	-webkit-border-radius: 0 0 0 0;
	-moz-border-radius: 0 0 0 0;
}
.tree li:first-child:after{
	border-radius: 0 0 0 0;
	-webkit-border-radius: 0 0 0 0;
	-moz-border-radius: 0 0 0 0;
}
/*Time to add downward connectors from parents*/
.tree ul ul:before{
	content: '';
	position: absolute; top: 0; left: 50%;
	border-left: 1px solid #ccc;
	width: 0; height: 20px;
}
.tree li a{
	border: 1px solid #ccc;
	padding: 5px 10px;
	text-decoration: none;
	color: #666;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 11px;
	display: inline-block;
	border-radius: 0;
	-webkit-border-radius: 0;
	-moz-border-radius: 0;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}
/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
.tree li a:hover, .tree li a:hover+ul li a {
	background: #c8e4f8; color: #000; border: 1px solid #94a0b4;
}
/*Connector styles on hover*/
.tree li a:hover+ul li:after, 
.tree li a:hover+ul li:before, 
.tree li a:hover+ul:before, 
.tree li a:hover+ul ul:before{
	border-color:  #94a0b4;
}
</style>

</head>
<body>

<form name="orgchart" method="post">
{{ csrf_field() }}
<input type="hidden" id="usergroupid" value="2">
<?php
	if(!isset($_GET['company_id']))
	$company_id = '7';
else 
	$company_id = $_GET['company_id'];
		$firstLevel = DB::table('staffs')->where('report_to','0')->where('status','0')->where('company_id',$company_id)->where('staff_id', '!=', '1')->get();
?>
<div class="row uni-org-opts">
        <div class="col-xs-12 col-md-5">
                <div class="form-group">
                <section>
                    <select name="company_id" placeholder="Sort By Company" id="company_id" class="form-control">                        
                        <option value="0">Sort By Company</option>
<?php 
foreach($companies as $company) {
	?>
<option value="<?php echo $company->companygroup_id ?>" <?php if($company->companygroup_id == $company_id) echo "selected" ?> >
<?php echo $company->companygroup_name ?></option>                                             
    <?php
}
						?>
                    </select>
                </section>
                </div>
        </div>
    <div class="col-xs-12 col-md-2 pull-right">
</div>
</div>
<div style="overflow-x:scroll; overflow:auto">
<div class="tree-overflow">
<div id="treehtml">
<div class="tree">
<ul>
	<?php foreach($firstLevel as $parent) { ?>
	<li>
		@if(is_file( public_path() . '/staffphotos/'.$parent->photo))
		<img src="http://denyoappv2.stridecdev.com/staffphotos/{{$parent->photo}}" onclick="pushimage({{$parent->staff_id}})">        
		@else 
		<img src="http://denyoappv2.stridecdev.com/images/default.png" onclick="pushimage({{$parent->staff_id}})">        
		@endif
		<h3>{{$parent->firstname}}</h3>
		<h3>{{ $parent->lastname }}</h3>
		<h4>{{ $parent->job_position }}</h4>
		<ul>
			<?php
			$secondParent = DB::table('staffs')->where('report_to',$parent->staff_id)->where('status','0')->where('company_id',$company_id)->get();
			foreach($secondParent as $secondChild) {
			?>
			<li>
				@if(is_file( public_path() . '/staffphotos/'.$secondChild->photo))
				<img src="http://denyoappv2.stridecdev.com/staffphotos/{{$secondChild->photo}}" onclick="pushimage({{$secondChild->staff_id}})">        
				@else 
				<img src="http://denyoappv2.stridecdev.com/images/default.png" onclick="pushimage({{$secondChild->staff_id}})">        
				@endif
				<h3>{{ $secondChild->firstname }}</h3>
				<h3>{{ $secondChild->lastname }}</h3>
				<h4>{{ $secondChild->job_position }}</h4>
				<ul>
					<?php
					$thirdParent = DB::table('staffs')->where('report_to',$secondChild->staff_id)->where('status','0')->where('company_id',$company_id)->get();
					foreach($thirdParent as $thirdChild) {
					?>
					<li>
						@if(is_file( public_path() . '/staffphotos/'.$thirdChild->photo))
						<img src="http://denyoappv2.stridecdev.com/staffphotos/{{$thirdChild->photo}}" onclick="pushimage({{ $thirdChild->staff_id }})">        
						@else 
						<img src="http://denyoappv2.stridecdev.com/images/default.png" onclick="pushimage({{ $thirdChild->staff_id }})">        
						@endif
						
						<h3>{{ $thirdChild->firstname }}</h3>
						<h3>{{ $thirdChild->lastname }}</h3>
						<h4>{{ $thirdChild->job_position }}</h4>
					</li>	
					<?php
					}
					?>
				</ul>
			</li>	
			<?php
			}
			?>
		</ul> <!-- remove this two -->
	</li> <!-- remove this two -->
	<?php	
	}
	?>
</ul>
</div>
</div>
</div>
</div>
<input type="hidden" id="staffid" value="">
<input type="hidden" id="parentid" value="">
<div class="style-popup">
    <div class="style-popup-bg">
    <div class="whole-cnt-outer">
    <a href="javascript:void(0);" class="popup-close">CLOSE</a>
      <div class="whole-cnt">
  <div class="img-part">
      <img id="orgimage" src="" width="150px" height="200px">
        <h3></h3>
        <button type="button" onclick="userdetail()" id="hashtagedit">Edit</button>
        <button type="button" onclick="staffdetail()" id="staffdetails" style="display:none;">Edit</button>
  <button type="button" id="deleteuser" onclick="userdelete()" style="margin-top:10px; background:#F00;display:none;">Delete User</button>
 <button type="button" id="deletenonuser" onclick="nonuserdelete()" style="margin-top:10px; background:#F00;display:none;">Delete Non-User</button>
    </div>
    <div class="cnt-part">
      <div class="cnt-sep">
          <label id="orgname"></label>
          <label id="orglastname"></label>
            <span id="role"></span>
        </div>
        <div class="cnt-sep" id="hashtagblock" style="display:none;">
          <label>Hashag</label>
            <span id="hashtag"></span>
        </div>
        <div class="cnt-sep">
          <label>Email</label>
            <span><a href="#" id="orgemail"></a></span>
        </div>
        <div class="cnt-sep">
          <label>Contact Number</label>
            <span><a href="" id="orgmobile"></a></span>
        </div>
    </div>
</div>
    </div>
    </div>
</div>
</form>
</body>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.js"></script>
<script>
$(document).ready(function() {
  $("#company_id").change(function()
  {
   var companygroupid = document.getElementById("company_id").value;   
   window.location = "/orgchart?company_id="+companygroupid+"&is_mobile=1"+"&id?="+<?php echo $loginid ?>;
  });
		$('.popup-close').click(function(){
		$('.style-popup').hide();
		});
});
function pushimage(id) {
	var token = $('input[name=_token]').val();     
	 $.ajax({
		headers: {'X-CSRF-TOKEN': token},
		method: "POST",
		url : "{{ url('orgchart/getdetails') }}",
		data: {id: id},   
		success : function(data){   
			//alert(data);    
			var result = data.split("#");			
			var name=result[0];
			var lanme=result[1];
			var email=result[2];
			var mobile="tel:"+result[3];
		var img=result[4];			
      //var company=result[4];
			var jobposition=result[5];
			var hashtag=result[6];
      var staffid=result[7];
      //var orgid=result[9];
  //    var parentid=result[10];
    document.getElementById("staffid").value=staffid;
	document.getElementById("orgname").innerHTML=name;
	document.getElementById("orglastname").innerHTML=lanme;
	document.getElementById("orgemail").innerHTML=email;
	document.getElementById("orgmobile").innerHTML=mobile;
	//document.getElementById("orgmobile").href=mobile; 
	document.getElementById("role").innerHTML=jobposition;
	document.getElementById("hashtag").innerHTML=hashtag;
	document.getElementById("orgimage").src =img;
            if(hashtag=="")
            {
                document.getElementById('hashtagblock').style.display = "none";
                document.getElementById("staffdetails").style.display = "block";
                document.getElementById("orgimage").src =img;
                document.getElementById("parentid").value=parentid;
		document.getElementById('hashtagedit').style.display = "none";
		document.getElementById('deletenonuser').style.display = "block";
                document.getElementById('deleteuser').style.display = "none";
            }
            else
            {
               document.getElementById('hashtagblock').style.display = "block"; 
               document.getElementById("staffid").value=staffid;
               document.getElementById("staffdetails").style.display = "none";
               document.getElementById("orgimage").src =img;
               document.getElementById("hashtag").innerHTML=hashtag;
               document.getElementById("parentid").value=parentid;
		document.getElementById('hashtagedit').style.display = "block";
		document.getElementById('deleteuser').style.display = "block";
               document.getElementById('deletenonuser').style.display = "none";
            }
		},
		error: function(ts) { 
		alert(ts.responseText) 
		}
	}); 
	$('.style-popup').css('display', 'block');
}
function staffdetail()
{
  var id=document.getElementById("staffid").value;
///photos/{photo}/edit
  window.location = "orgchart/"+id+"/edit";
}

function nonuserdelete()
{
//	console.log('sds');
  var staff_id=document.getElementById("staffid").value;
  //var deletedetails=document.getElementById("orgid").value;
  //var groupid = document.getElementById("usergroupid").value;
  //var staffid=document.getElementById("staffid").value;
    var token = $('input[name=_token]').val();     
   $.ajax({
    headers: {'X-CSRF-TOKEN': token},
    method: "POST",
    url : "{{ url('orgchart/deletedetails') }}",
    data: {staffid:staffid,is_mobile:0},   
    success : function(data){
      alert(data);
      window.location = '/orgchart/'+staffid+'/0/delete';
      },
    error: function(ts) { alert(ts.responseText) }
  }); 
}
</script>
<?php 
		
		$currentroute = Route::getCurrentRoute()->getActionName(); 
		
		$currentroute = @explode("@", $currentroute);
		//print_r($currentroute);
		$routeaction = $currentroute[1];
		$routecontroller = @explode("\\", $currentroute[0]);
		$routecontroller = end($routecontroller);

	?>
	<script src="{{url('/')}}/assets/lib/jquery/jquery.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/jquery.nanoscroller/javascripts/jquery.nanoscroller.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/js/main.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
	@if($routeaction == "index" && $routecontroller != "OrgchartController")
	<script src="{{url('/')}}/assets/lib/datatables/js/jquery.dataTables.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/js/dataTables.bootstrap.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/dataTables.buttons.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/buttons.html5.js" type="text/javascript"></script>
	@elseif($routeaction == "unitdetails")
	<script src="{{url('/')}}/assets/lib/jquery.sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
    	<script src="{{url('/')}}/assets/js/app-charts-sparkline.js" type="text/javascript"></script>
	@else
	<script src="{{url('/')}}/assets/js/app-form-elements.js" type="text/javascript"></script>
	@endif
	<!--script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/buttons.flash.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/buttons.print.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/buttons.colVis.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datatables/plugins/buttons/js/buttons.bootstrap.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/js/app-tables-datatables.js" type="text/javascript"></script>

	<script src="{{url('/')}}/assets/lib/parsley/parsley.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
	<script src="{{url('/')}}/assets/lib/select2/js/select2.min.js" type="text/javascript"></script>
	<!--script src="{{url('/')}}/assets/lib/bootstrap-slider/js/bootstrap-slider.js" type="text/javascript"></script-->
	
	
	<script type="text/javascript">
	$(document).ready(function(){
		var routeaction = '{{ $routeaction }}';
		var routecontroller = '{{ $routecontroller }}';
		//initialize the javascript
		App.init();
		if(routeaction == "index"  && routecontroller != "OrgchartController")
			App.dataTables();
		else if(routeaction == "unitdetails")
			App.chartsSparklines();
		else
			App.formElements();
		// $('form').parsley();
		//App.formElements();
	});
	</script>
</html>	
