<?php
header('Access-Control-Allow-Origin: *');
//error_reporting(-1);
//ini_set('display_errors', 'On');
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
$tem=$_GET['tem'];
$act=$_GET['act'];
$companyId=$_GET['companyId'];
$userId=$_GET['userId'];
try {
   // echo "select username from users where username like '$tem%'";
if($act=='message'){
  if($userId!='1'){
$queryStr="select s.personalhashtag as username from staffs as s,users as u where  s.company_id in (1, $companyId) and s.staff_id!=".$userId.  " and u.username like '$tem%' and u.user_id=s.staff_id and u.deletestatus=0";
  }else{
    $queryStr="select s.personalhashtag as username from staffs as s,users as u where  u.username like '$tem%' and u.user_id=s.staff_id  and u.deletestatus=0";

  }
  
}else{
   if($userId!='1'){
     $queryStr="select s.personalhashtag as username from staffs as s,users as u where  s.company_id=".$companyId." and s.staff_id!=".$userId.  " and u.username like '$tem%'  and u.user_id=s.staff_id  and u.deletestatus=0";
   }else{
 $queryStr="select s.personalhashtag as username from staffs as s,users as u where  s.company_id=".$companyId." and u.username like '$tem%'  and u.user_id=s.staff_id  and u.deletestatus=0";
  
   }
}
 

//echo $queryStr;
//exit;
 //$queryStr="select username from users where username like '$tem%'";
      $stmt    = $pdo->query($queryStr);
	  	echo "<ul class='uls'>";
     // if(count($stmt->fetch(PDO::FETCH_OBJ))==0){echo "<li>No data match</li>";};
     //$rowcount  = $stmt->fetch(PDO::FETCH_OBJ);
    // echo $rowcount;
   // $result = mysqli_query($queryStr);  
   // $number_of_rows = mysqli_num_rows($result);  
    //if($number_of_rows==0){echo "<li>No data match</li>";};
    $sno=0;
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
        $sno++;
        if($row->username!=''){
		echo "<li onclick='setct(this)'>".$row->username."</li>";
        }
      }
       if($sno==0){echo "<li>No data match</li>";};
	  echo "</ul>";
	break;

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
