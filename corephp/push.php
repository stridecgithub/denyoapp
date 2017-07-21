<?php
header('Access-Control-Allow-Origin: *');

define( 'API_ACCESS_KEY', 'AAAAMsL3XDM:APA91bE7SEGJJDb84Rm9ZDCSyCaKzIRFNeJuLfioAFqbCJ3ulYPN9Mmn4fJzsQUHaMH8uZZuG7lm4fItlyIB_U2BV9qWvgA8zNGYly5xXWtCmRGuNJj051bjjYbvyMp_L18b15IDsXHI' );

// Define database connection parameters
$hn      = 'localhost';
$un      = 'denyoappv2';
$pwd     = 'RfS4aE4Wxq2daL0D';
$db      = 'denyoappv2';
$cs      = 'utf8';

// Set up the PDO parameters
$dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
$opt  = array(
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES   => false,
       );
// Create a PDO instance (connect to the database)
$pdo  = new PDO($dsn, $un, $pwd, $opt);
$data = array();
extract($_GET);
try {
      $stmt    = $pdo->query("SELECT * FROM `pushnotifications` WHERE appstatus = 0");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
		// Assign each row of data to associative array
		// $data[] = $row;	
		$registrationIds = '';
		$tokens = $pdo->query("SELECT * FROM `devicetokens` WHERE staffid = '".$row->notify_to."'");
		$tokendata = $tokens->fetch(PDO::FETCH_OBJ);
		if($tokendata->deviceid != "null")
		{

			$registrationIds = array($tokendata->deviceid);

			// prep the bundle
			$msg = array
			(
			    'message'   => strip_tags(nl2br($row->notify_content)),
			    'title'     => $row->notify_subject,			    
			    'tickerText'=> strip_tags(nl2br($row->notify_content)),
			    'vibrate'   => 1,
			     'sound'=> 'default',
				  'vibrate'   => 1,
    'sound'     => 1,
			    'largeIcon' => 'large_icon',
			    'smallIcon' => 'small_icon'
			);
			$fields = array
			(
			    'registration_ids'  => $registrationIds,
			    'data'          => $msg
			);

			$headers = array
			(
			    'Authorization: key=' . API_ACCESS_KEY,
			    'Content-Type: application/json'
			);

			$ch = curl_init();
			curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
			curl_setopt( $ch,CURLOPT_POST, true );
			curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
			curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
			curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
			$result = curl_exec($ch );
			curl_close( $ch );
			echo $result;

			$pdo->query("UPDATE `pushnotifications` SET appstatus = 1 WHERE pushnotification_id  = '".$row->pushnotification_id."'");
		}
      }

      // Return data as JSON
      //echo json_encode($data);
}
catch(PDOException $e)
{
	echo $e->getMessage();
}
// API access key from Google API's Console
exit;



?>
