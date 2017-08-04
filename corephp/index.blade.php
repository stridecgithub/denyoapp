<?php
use Symfony\Component\HttpFoundation\Session\Session;

$session = new Session();
$ses_login_id = $session->get('ses_login_id');
$mainmenu = $session->get('mainmenu');
$dashboardunits = DB::table('view_on_dashboard')->where('view_staff_id', $ses_login_id)->get();			
$i = 0;
$location = $informations = '';
if(count($dashboardunits) > 0) {
	foreach($dashboardunits as $dashunits) {
		$latlongs = DB::table('unit_latlong')->join('units', 'units.unit_id', '=', 'unit_latlong.latlong_unit_id')->where('unit_latlong.latlong_unit_id',$dashunits->view_unit_id)->where('units.deletestatus',0)->orderBy('unit_latlong.unit_latlong_id', 'desc')->skip(0)->take(1)->get();
		
		if(count($latlongs) > 0)
		{
			$runninghr = DB::table('unit_currentstatus')->where('generatorid', $latlongs[0]->controllerid)->where('code', 'RUNNINGHR')->get();
			
			$location[$i]['latitude'] = $latlongs[0]->latitude;
			$location[$i]['longtitude'] = $latlongs[0]->longtitude;
			$informations[$i]['unitname'] = $latlongs[0]->unitname;
			$informations[$i]['projectname'] = $latlongs[0]->projectname;
			$informations[$i]['uid'] = $latlongs[0]->unit_id;
			
			//echo count($runninghr);
			if(count($runninghr) > 0) {
				if($runninghr) {
					$informations[$i]['runninghr'] = $runninghr[0]->value;
				}
			}
			else $informations[$i]['runninghr'] = 0; 				
		}
		$i++;
	}
}

if(in_array(1,$mainmenu)) {	
	$role_id = $session->get('role_id');
	$access = DB::table('role_permissions')->where('module_name','1')->where('role_id',$role_id)->get();
}

?>
@extends('layouts.master')
@section('title', 'Dashboard')
@section('breadCrumbs')
<style>
       #map {
        height: 400px;
        width: 100%;
       }
	   th { white-space: nowrap; }
	   
</style>
<div class="page-head">
		<h2 class="pull-left">Dashboard</h2>		
</div>
@stop
@section('pageBody')
@if(count($access) > 0)
		@if($access[0]->view_action == 1 && $access[0]->page_name == 8)
			 <div id="map"></div>
		@endif
		
		@if($access[1]->view_action == 1 && $access[1]->page_name == 12)
			
			  <div class="row" style="margin-top: -25px;">
<div class="col-sm-2">
 <select class="form-control dropaction" name="dropdownaction">
	<option value="">Action</option>
	<option value="view">View</option>
	<option value="hide">Hide On Dashboard</option>
 </select>
 </div></div>
						
<div class="widget widget-fullwidth widget-small own-table">

{!! $dataTable->table() !!}

</div>
		@endif

@endif	



@endsection

@push('scripts')

{!! $dataTable->scripts() !!}

<script>	  
	
	$("select[name='dropdownaction']").change(function() {
		var dropdownaction = $(this).val();
		var checkboxarr = document.getElementsByName('multiplecheck[]');
		var checkboxtrue=0;
		var ids = [];
		for(var i=0; i < checkboxarr.length; i++) {
			var checked = checkboxarr[i].checked;
			if(checked == true) {				
				ids.push(checkboxarr[i].value);
				checkboxtrue++;				
			}
		}	
		if(checkboxtrue > 0) {	
			if(dropdownaction == 'hide')			
				var chk = confirm("Are you sure! you want to Hide selected unit(s)?");			
			else {
//                  			var chk = confirm("Are you sure! you want to hide selected unit(s) on Dashboard?");
			}
			if(chk)		
				window.location = "{{ url('/').'/dashboardaction?id=' }}"+ids+"&action="+dropdownaction+"&is_mobile=0&loginid=0";			
		}		
		else {
			alert('Please select atleast one Unit in checkbox');
		}
	});
		  

  //mdv
	function initMap() {
    var map;
	var def_latlng;
	<?php if(isset($_GET['uidzoom'])) { $unit_latlng = DB::table('unit_latlong')->where('latlong_unit_id',$_GET['uidzoom'])->get(); ?>
	def_latlng = {lat:<?php if(count($unit_latlng) > 0) echo $unit_latlng[0]->latitude ?>,lng: <?php if(count($unit_latlng) > 0) echo $unit_latlng[0]->longtitude ?> }
	<?php } else { ?>
	def_latlng = {lat: 1.3249773, lng: 103.70307100000002};
    <?php } ?>
	var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
		center: def_latlng,
		zoom: <?php if(isset($_GET['uidzoom'])) echo '14'; else echo '11'; ?>		
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
<?php if(isset($location) && count($location) > 0) { ?>
    var markers = [
		<?php if(count($location) > 0) {			
				for($i = 0; $i < count($location); $i++) { ?>
					['', {{ @$location[$i]['latitude'] }}, {{ @$location[$i]['longtitude'] }}]
					<?php if($i < @count($location) - 1) { echo ','; } ?>
				<?php } ?>
		<?php } ?>
    ];
<?php } ?>
	
    // Info Window Content
    var infoWindowContent = [
		@if($informations)
			<?php foreach($informations as $key => $infos) { ?>
				['<div class="info_content">' +
	  '<h3><a href="{{ $infos['uid'] }}/0/unitdetails">{{ $infos['unitname'] }}</a></h3>' +
					'<h4>{{ $infos['projectname'] }}</h4>' +
					'<p>{{ $infos['runninghr'] }}</p>' +'</div>']
					<?php if($key < count($informations) - 1) { echo ','; } ?>
			<?php } ?>
		@endif       
    ];
	
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
				map.setZoom(17);
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        //map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        // this.setZoom(9);
        // google.maps.event.removeListener(boundsListener);
    // });
    
    }
	  //mdv

</script> 
<script async defer src="https://maps.googleapis.com/maps/api/js?v=3&key= AIzaSyCbvwOWwex4xcDVJKlfPsJiz5fmmsEB9KA&callback=initMap"></script>



<script>
$(document).ready(function() {

var table = $('#dataTableBuilder').DataTable();
table
    .column( '0:visible' )
    .order( 'desc' )
    .draw();
});

function hideunit(unitid) {
	var result = confirm("Are you sure, you want to hide this record?");
	if(result)
        window.location = "dashboard/"+unitid+"/0/delete";
}

function setfavorites(unitid,staffid) {
	var token = $('input[name=_token]').val();   
	
	$.ajax({
		headers: {'X-CSRF-TOKEN': token},
		method: "POST",
		url : "{{ url('/setunitfavorite') }}",
		data: {unitid: unitid, loginid:staffid, is_mobile: 0},     
		success : function(data){			
			if(data == "fav")
				$("#fav_"+unitid).html('<i class="glyphicon glyphicon-star" style="color:#ff8a00; font-size:18px;"></i>');
			else
				$("#fav_"+unitid).html('<i class="glyphicon glyphicon-star" style="color:#ffdcb2; font-size:18px;"></i>');
		}
	});   
}

</script>
@endpush
