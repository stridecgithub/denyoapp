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
	
<style>
       #map {
        height: 400px;
        width: 100%;
       }
</style>

</head>

<body>
<?php
$ses_login_id = '';
if(isset($_GET['ses_login_id'])) {
	if($_GET['ses_login_id'] != '')
		$ses_login_id = $_GET['ses_login_id'];	
}

$dashboardunits = DB::table('view_on_dashboard')->where('view_staff_id', $ses_login_id)->get();			
$i = 0;
$location = $informations = '';
if(count($dashboardunits) > 0) {
	foreach($dashboardunits as $dashunits) {
		$latlongs = DB::table('unit_latlong')->join('units', 'units.unit_id', '=', 'unit_latlong.latlong_unit_id')->where('unit_latlong.latlong_unit_id', 				$dashunits->view_unit_id)->where('units.deletestatus',0)->get();
		
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
			else
				$informations[$i]['runninghr'] = 0; 
				
		}
		$i++;
	}
}
?>
 <div id="map"></div>

</body>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.js"></script>

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
	  
	  //mdv
function initMap() {	
    var map;
	var def_latlng = {lat: 1.3249773, lng: 103.70307100000002};
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {		
        mapTypeId: 'roadmap',
		center: def_latlng,
		zoom:11
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers

    var markers = [
		@if(count($location) > 0)
			@if(is_array($location))
			<?php foreach($location as $key => $loc) { ?>
				['', {{ $loc['latitude'] }} , {{ $loc['longtitude'] }}]
				@if($key < count($location) - 1)
					{{ ',' }}
				@endif
			<?php
			}
			?>
			@endif		       
		@endif		       
    ];
                        
    // Info Window Content
    var infoWindowContent = [
		@if(count($informations) > 0 && is_array($informations))
			@foreach($informations as $ki => $infos)
				['<div class="info_content">' +
				'<h3><a href="{{ $infos['uid'] }}/0/unitdetails">{{ $infos['unitname'] }}</a></h3>' +
				'<h4>{{ $infos['projectname'] }}</h4>' +
				'<p>{{ $infos['runninghr'] }}</p>' +'</div>']
				<?php if($i < count($informations) - 1) { echo ','; } ?>
			@endforeach		
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