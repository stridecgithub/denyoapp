<?php
header('Access-Control-Allow-Origin: *');

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
/*$data = array();
extract($_GET);
$wheredate="role_name!=''";

// Attempt to query database table and retrieve data
try {
  $stmt    = $pdo->query("SELECT id,role_name FROM roles where ".$wheredate);
  while($row  = $stmt->fetch(PDO::FETCH_OBJ))
  {
  // Assign each row of data to associative array
  $data[] = $row;
  }

  // Return data as JSON
  echo json_encode($data);
}
catch(PDOException $e)
{
echo $e->getMessage();
}

*/
 // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   $data    = array();
    $createdon_updatedon=date("Y-m-d h:i:s",time());
 $createdby_updatedby   = filter_var($_REQUEST['createdby'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

   // Determine which mode is being requested
   switch($key)
   {

        // Add a new record to the companygroups table
        case "create":


        // Sanitise URL supplied values
        $role_name       = filter_var($_REQUEST['role_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
       



        // Attempt to run PDO prepared statement
        try {
                $sql = "select count(*) from roles where role_name='$role_name'"; 
                $result = $pdo->prepare($sql); 
                $result->execute(); 
                $number_of_rows = $result->fetchColumn(); 
                if($number_of_rows==0){
                    $sql  = "INSERT INTO roles(role_name, createdby,createdon) VALUES(:role_name, :createdby,:createdon)";
                    $stmt    = $pdo->prepare($sql);
                    $stmt->execute(
                    array(
                    ":role_name" => $role_name,                    
                    ":createdby" => $createdby_updatedby,
                    ":createdon" =>$createdon_updatedon

                    )
                    );
                        $role_id=$pdo->lastInsertId();
                    // Permission Table Entry
                        $permissiondata_array = json_decode($_REQUEST['roleperMissionData'],true);
// Dashbord Map
    $module_name="Dashboard";
    $page_name='Map';
    $view_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardviewmap'];
    $create_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardcreatemap'];
    $edit_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardeditmap'];
    $delete_action=$permissiondata_array[0]['Dashboard']['Map']['dashboarddeletemap'];
    $hide_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardhidemap'];
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Dashbord Map

 // Dashbord Units
    $module_name="Dashboard";
    $page_name='Units';
    $view_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardviewunits'];
    $create_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardcreateunits'];
    $edit_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardeditunits'];
    $delete_action=$permissiondata_array[0]['Dashboard']['Units']['dashboarddeleteunits'];
    $hide_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardhideunits'];
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Dashbord Units

// Calendar Events
    $module_name="Calendar";
    $page_name='Events';
    $view_action=$permissiondata_array[0]['Calendar']['Events']['calviewevents'];
    $create_action=$permissiondata_array[0]['Calendar']['Events']['calcreateevents'];
    $edit_action=$permissiondata_array[0]['Calendar']['Events']['caleditevents'];
    $delete_action=$permissiondata_array[0]['Calendar']['Events']['caldeleteevents'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Events
                   
// Calendar Services
    $module_name="Calendar";
    $page_name='Services';
    $view_action=$permissiondata_array[0]['Calendar']['Services']['calviewservices'];
    $create_action=$permissiondata_array[0]['Calendar']['Services']['calcreateservices'];
    $edit_action=$permissiondata_array[0]['Calendar']['Services']['caleditservices'];
    $delete_action=$permissiondata_array[0]['Calendar']['Services']['caldeleteservices'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Services
                   
// Calendar Alarm
    $module_name="Calendar";
    $page_name='Alarm';
    $view_action=$permissiondata_array[0]['Calendar']['Alarm']['calviewalarm'];
    $create_action=$permissiondata_array[0]['Calendar']['Alarm']['calcreatealarm'];
    $edit_action=$permissiondata_array[0]['Calendar']['Alarm']['caleditalarm'];
    $delete_action=$permissiondata_array[0]['Calendar']['Alarm']['caldeletealarm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Alarm
           
// Units Units Listing
    $module_name="Units";
    $page_name='Units Listing';
    $view_action=$permissiondata_array[0]['Units']['Units Listing']['univiewlist'];
    $create_action=$permissiondata_array[0]['Units']['Units Listing']['unicreatelist'];
    $edit_action=$permissiondata_array[0]['Units']['Units Listing']['unieditlist'];
    $delete_action=$permissiondata_array[0]['Units']['Units Listing']['unideletelist'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Units Listing
                  
// Units Alarm
    $module_name="Units";
    $page_name='Alarm';
    $view_action=$permissiondata_array[0]['Units']['Alarm']['univiewalarm'];
    $create_action=$permissiondata_array[0]['Units']['Alarm']['unicreatealarm'];
    $edit_action=$permissiondata_array[0]['Units']['Alarm']['unieditalarm'];
    $delete_action=$permissiondata_array[0]['Units']['Alarm']['unideletealarm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Alarm


// Units Servicing Info
    $module_name="Units";
    $page_name='Servicing Info';
    $view_action=$permissiondata_array[0]['Units']['Servicing Info']['univiewservices'];
    $create_action=$permissiondata_array[0]['Units']['Servicing Info']['unicreateservices'];
    $edit_action=$permissiondata_array[0]['Units']['Servicing Info']['unieditservices'];
    $delete_action=$permissiondata_array[0]['Units']['Servicing Info']['unideleteservices'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Servicing Info

     // Units Comments
    $module_name="Units";
    $page_name='Comments';
    $view_action=$permissiondata_array[0]['Units']['Comments']['univiewcomm'];
    $create_action=$permissiondata_array[0]['Units']['Comments']['unicreatecomm'];
    $edit_action=$permissiondata_array[0]['Units']['Comments']['unieditcomm'];
    $delete_action=$permissiondata_array[0]['Units']['Comments']['unideletecomm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Comments    

     // Units Unit Group
    $module_name="Units";
    $page_name='Unit Group';
    $view_action=$permissiondata_array[0]['Units']['Unit Group']['univiewgroup'];
    $create_action=$permissiondata_array[0]['Units']['Unit Group']['unicreategroup'];
    $edit_action=$permissiondata_array[0]['Units']['Unit Group']['unieditgroup'];
    $delete_action=$permissiondata_array[0]['Units']['Unit Group']['unideletegroup'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// UnitsUnit Group


 // Units Unit Group
    $module_name="Units";
    $page_name='Generator Model Management';
    $view_action=$permissiondata_array[0]['Units']['Generator Model Management']['univiewgmm'];
    $create_action=$permissiondata_array[0]['Units']['Generator Model Management']['unicreategmm'];
    $edit_action=$permissiondata_array[0]['Units']['Generator Model Management']['unieditgmm'];
    $delete_action=$permissiondata_array[0]['Units']['Generator Model Management']['unideletegmm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// UnitsUnit Group

          
//Reports Reports
    $module_name="Reports";
    $page_name='Reports';
    $view_action=$permissiondata_array[0]['Reports']['Reports']['viewreports'];
    $create_action=$permissiondata_array[0]['Reports']['Reports']['createreports'];
    $edit_action=$permissiondata_array[0]['Reports']['Reports']['editreports'];
    $delete_action=$permissiondata_array[0]['Reports']['Reports']['deletereports'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Reports Reports
//Messages Inbox
    $module_name="Messages";
    $page_name='Inbox';
    $view_action=$permissiondata_array[0]['Messages']['Inbox']['msgviewinbox'];
    $create_action=$permissiondata_array[0]['Messages']['Inbox']['msgcreateinbox'];
    $edit_action=$permissiondata_array[0]['Messages']['Inbox']['msgeditinbox'];
    $delete_action=$permissiondata_array[0]['Messages']['Inbox']['msgdeleteinbox'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Messages Inbox
//Messages Sent
    $module_name="Messages";
    $page_name='Sent';
    $view_action=$permissiondata_array[0]['Messages']['Sent']['msgviewsent'];
    $create_action=$permissiondata_array[0]['Messages']['Sent']['msgcreatesent'];
    $edit_action=$permissiondata_array[0]['Messages']['Sent']['msgeditsent'];
    $delete_action=$permissiondata_array[0]['Messages']['Sent']['msgdeletesent'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Messages Sent
          
//Settings My Account
    $module_name="Settings";
    $page_name='My Account';
    $view_action=$permissiondata_array[0]['Settings']['My Account']['setviewmyacc'];
    $create_action=$permissiondata_array[0]['Settings']['My Account']['setcreatemyacc'];
    $edit_action=$permissiondata_array[0]['Settings']['My Account']['seteditmyacc'];
    $delete_action=$permissiondata_array[0]['Settings']['My Account']['setdeletemyacc'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Settings My Account
                   
//Settings User List
    $module_name="Settings";
    $page_name='User List';
    $view_action=$permissiondata_array[0]['Settings']['User List']['setviewuselst'];
    $create_action=$permissiondata_array[0]['Settings']['User List']['setcreateuselst'];
    $edit_action=$permissiondata_array[0]['Settings']['User List']['setedituselst'];
    $delete_action=$permissiondata_array[0]['Settings']['User List']['setdeleteuselst'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User List
                   
//Settings User Group
    $module_name="Settings";
    $page_name='User Group';
    $view_action=$permissiondata_array[0]['Settings']['User Group']['setviewusegru'];
    $create_action=$permissiondata_array[0]['Settings']['User Group']['setcreateusegru'];
    $edit_action=$permissiondata_array[0]['Settings']['User Group']['seteditusegru'];
    $delete_action=$permissiondata_array[0]['Settings']['User Group']['setdeleteusegru'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User Group
                  
//Settings User Role
    $module_name="Settings";
    $page_name='User Role';
    $view_action=$permissiondata_array[0]['Settings']['User Role']['setviewuserle'];
    $create_action=$permissiondata_array[0]['Settings']['User Role']['setcreateuserle'];
    $edit_action=$permissiondata_array[0]['Settings']['User Role']['setedituserle'];
    $delete_action=$permissiondata_array[0]['Settings']['User Role']['setdeleteuserle'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User Role
                  
//Settings Report Template
    $module_name="Settings";
    $page_name='Report Template';
    $view_action=$permissiondata_array[0]['Settings']['Report Template']['setviewtmp'];
    $create_action=$permissiondata_array[0]['Settings']['Report Template']['setcreatetmp'];
    $edit_action=$permissiondata_array[0]['Settings']['Report Template']['setedittmp'];
    $delete_action=$permissiondata_array[0]['Settings']['Report Template']['setdeletetmp'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings Report Template                   

        //Settings Org Chart
    $module_name="Settings";
    $page_name='Org Chart';
    $view_action=$permissiondata_array[0]['Settings']['Org Chart']['setvieworg'];
    $create_action=$permissiondata_array[0]['Settings']['Org Chart']['setcreateorg'];
    $edit_action=$permissiondata_array[0]['Settings']['Org Chart']['seteditorg'];
    $delete_action=$permissiondata_array[0]['Settings']['Org Chart']['setdeleteorg'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings Org Chart


                        //exit;
                    // Permission Table Entrr
                     echo json_encode(array('Error'=>0,'message' => 'Congratulations the record ' . $role_name . ' was added to the database'));
                }else{
                   echo json_encode(array('Error'=>1,'message' => 'Role name already exists'));  
                }
               
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
            echo json_encode(array('message' => $e->getMessage()));
        //echo $e->getMessage();
        }

        break;

    case "run":

        $sortname=$_REQUEST['sort'];
        $sortascdesc=$_REQUEST['dir'];
        $startIndex=$_REQUEST['startIndex'];
        $results=$_REQUEST['results']; 

        $orderby="order by ".$sortname." ".$sortascdesc;
        $limit="limit ".$startIndex.",".$results;
        $wheredate="deletestatus='0'";
        try {

        $sql = "SELECT count(*) as totalCount FROM roles"; 
        $result = $pdo->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn(); 


        $stmt    = $pdo->query("SELECT id,role_name FROM roles where ".$wheredate." ".$orderby." ".$limit);
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {
        // Assign each row of data to associative array

        $row->totalCount=$number_of_rows;
        $data[] = $row;
        }

        // Return data as JSON
        echo json_encode($data);
        }
        catch(PDOException $e)
        {
        echo $e->getMessage();
        }
    break;


    case "all":       
        try {      


        $stmt    = $pdo->query("SELECT id,role_name FROM roles");
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {        
        $data[] = $row;
        }

        // Return data as JSON
        echo json_encode($data);
        }
        catch(PDOException $e)
        {
        echo $e->getMessage();
        }
    break;

      // Update an existing record in the companygroups table
      case "update":

         // Sanitise URL supplied values
         $role_name          = filter_var($_REQUEST['role_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);        
         $recordID      = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);
         $id      = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);
          $role_id      = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {    


              $sql = "select count(*) from roles where role_name='$role_name' and id!='$recordID'"; 
                $result = $pdo->prepare($sql); 
                $result->execute(); 
                $number_of_rows = $result->fetchColumn(); 
                if($number_of_rows==0){         
            $sql  = "UPDATE roles SET role_name = :role_name, updatedby = :updatedby, updatedon = :updatedon WHERE id = :id";
            //exit;
                $stmt =  $pdo->prepare($sql);
                $stmt->bindParam(':role_name', $role_name, PDO::PARAM_STR);               
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                 $stmt->bindParam(':updatedby', $createdby_updatedby, PDO::PARAM_INT);
                 $stmt->bindParam(':updatedon', $createdon_updatedon, PDO::PARAM_INT);
                $stmt->execute();


// Permission Table Entry


$sql  = "DELETE FROM role_permissions WHERE role_id = :role_id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':role_id', $role_id, PDO::PARAM_INT);
$stmt->execute();

                        $permissiondata_array = json_decode($_REQUEST['roleperMissionData'],true);
// Dashbord Map
    $module_name="Dashboard";
    $page_name='Map';
    $view_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardviewmap'];
    $create_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardcreatemap'];
    $edit_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardeditmap'];
    $delete_action=$permissiondata_array[0]['Dashboard']['Map']['dashboarddeletemap'];
    $hide_action=$permissiondata_array[0]['Dashboard']['Map']['dashboardhidemap'];
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Dashbord Map

 // Dashbord Units
    $module_name="Dashboard";
    $page_name='Units';
    $view_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardviewunits'];
    $create_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardcreateunits'];
    $edit_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardeditunits'];
    $delete_action=$permissiondata_array[0]['Dashboard']['Units']['dashboarddeleteunits'];
    $hide_action=$permissiondata_array[0]['Dashboard']['Units']['dashboardhideunits'];
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Dashbord Units

// Calendar Events
    $module_name="Calendar";
    $page_name='Events';
    $view_action=$permissiondata_array[0]['Calendar']['Events']['calviewevents'];
    $create_action=$permissiondata_array[0]['Calendar']['Events']['calcreateevents'];
    $edit_action=$permissiondata_array[0]['Calendar']['Events']['caleditevents'];
    $delete_action=$permissiondata_array[0]['Calendar']['Events']['caldeleteevents'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Events
                   
// Calendar Services
    $module_name="Calendar";
    $page_name='Services';
    $view_action=$permissiondata_array[0]['Calendar']['Services']['calviewservices'];
    $create_action=$permissiondata_array[0]['Calendar']['Services']['calcreateservices'];
    $edit_action=$permissiondata_array[0]['Calendar']['Services']['caleditservices'];
    $delete_action=$permissiondata_array[0]['Calendar']['Services']['caldeleteservices'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Services
                   
// Calendar Alarm
    $module_name="Calendar";
    $page_name='Alarm';
    $view_action=$permissiondata_array[0]['Calendar']['Alarm']['calviewalarm'];
    $create_action=$permissiondata_array[0]['Calendar']['Alarm']['calcreatealarm'];
    $edit_action=$permissiondata_array[0]['Calendar']['Alarm']['caleditalarm'];
    $delete_action=$permissiondata_array[0]['Calendar']['Alarm']['caldeletealarm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Calendar Alarm
           
// Units Units Listing
    $module_name="Units";
    $page_name='Units Listing';
    $view_action=$permissiondata_array[0]['Units']['Units Listing']['univiewlist'];
    $create_action=$permissiondata_array[0]['Units']['Units Listing']['unicreatelist'];
    $edit_action=$permissiondata_array[0]['Units']['Units Listing']['unieditlist'];
    $delete_action=$permissiondata_array[0]['Units']['Units Listing']['unideletelist'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Units Listing
                  
// Units Alarm
    $module_name="Units";
    $page_name='Alarm';
    $view_action=$permissiondata_array[0]['Units']['Alarm']['univiewalarm'];
    $create_action=$permissiondata_array[0]['Units']['Alarm']['unicreatealarm'];
    $edit_action=$permissiondata_array[0]['Units']['Alarm']['unieditalarm'];
    $delete_action=$permissiondata_array[0]['Units']['Alarm']['unideletealarm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Alarm


// Units Servicing Info
    $module_name="Units";
    $page_name='Servicing Info';
    $view_action=$permissiondata_array[0]['Units']['Servicing Info']['univiewservices'];
    $create_action=$permissiondata_array[0]['Units']['Servicing Info']['unicreateservices'];
    $edit_action=$permissiondata_array[0]['Units']['Servicing Info']['unieditservices'];
    $delete_action=$permissiondata_array[0]['Units']['Servicing Info']['unideleteservices'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Servicing Info

     // Units Comments
    $module_name="Units";
    $page_name='Comments';
    $view_action=$permissiondata_array[0]['Units']['Comments']['univiewcomm'];
    $create_action=$permissiondata_array[0]['Units']['Comments']['unicreatecomm'];
    $edit_action=$permissiondata_array[0]['Units']['Comments']['unieditcomm'];
    $delete_action=$permissiondata_array[0]['Units']['Comments']['unideletecomm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Units Comments    

     // Units Unit Group
    $module_name="Units";
    $page_name='Unit Group';
    $view_action=$permissiondata_array[0]['Units']['Unit Group']['univiewgroup'];
    $create_action=$permissiondata_array[0]['Units']['Unit Group']['unicreategroup'];
    $edit_action=$permissiondata_array[0]['Units']['Unit Group']['unieditgroup'];
    $delete_action=$permissiondata_array[0]['Units']['Unit Group']['unideletegroup'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// UnitsUnit Group


 // Units Unit Group
    $module_name="Units";
    $page_name='Generator Model Management';
    $view_action=$permissiondata_array[0]['Units']['Generator Model Management']['univiewgmm'];
    $create_action=$permissiondata_array[0]['Units']['Generator Model Management']['unicreategmm'];
    $edit_action=$permissiondata_array[0]['Units']['Generator Model Management']['unieditgmm'];
    $delete_action=$permissiondata_array[0]['Units']['Generator Model Management']['unideletegmm'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// UnitsUnit Group

          
//Reports Reports
    $module_name="Reports";
    $page_name='Reports';
    $view_action=$permissiondata_array[0]['Reports']['Reports']['viewreports'];
    $create_action=$permissiondata_array[0]['Reports']['Reports']['createreports'];
    $edit_action=$permissiondata_array[0]['Reports']['Reports']['editreports'];
    $delete_action=$permissiondata_array[0]['Reports']['Reports']['deletereports'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Reports Reports
//Messages Inbox
    $module_name="Messages";
    $page_name='Inbox';
    $view_action=$permissiondata_array[0]['Messages']['Inbox']['msgviewinbox'];
    $create_action=$permissiondata_array[0]['Messages']['Inbox']['msgcreateinbox'];
    $edit_action=$permissiondata_array[0]['Messages']['Inbox']['msgeditinbox'];
    $delete_action=$permissiondata_array[0]['Messages']['Inbox']['msgdeleteinbox'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Messages Inbox
//Messages Sent
    $module_name="Messages";
    $page_name='Sent';
    $view_action=$permissiondata_array[0]['Messages']['Sent']['msgviewsent'];
    $create_action=$permissiondata_array[0]['Messages']['Sent']['msgcreatesent'];
    $edit_action=$permissiondata_array[0]['Messages']['Sent']['msgeditsent'];
    $delete_action=$permissiondata_array[0]['Messages']['Sent']['msgdeletesent'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Messages Sent
          
//Settings My Account
    $module_name="Settings";
    $page_name='My Account';
    $view_action=$permissiondata_array[0]['Settings']['My Account']['setviewmyacc'];
    $create_action=$permissiondata_array[0]['Settings']['My Account']['setcreatemyacc'];
    $edit_action=$permissiondata_array[0]['Settings']['My Account']['seteditmyacc'];
    $delete_action=$permissiondata_array[0]['Settings']['My Account']['setdeletemyacc'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
// Settings My Account
                   
//Settings User List
    $module_name="Settings";
    $page_name='User List';
    $view_action=$permissiondata_array[0]['Settings']['User List']['setviewuselst'];
    $create_action=$permissiondata_array[0]['Settings']['User List']['setcreateuselst'];
    $edit_action=$permissiondata_array[0]['Settings']['User List']['setedituselst'];
    $delete_action=$permissiondata_array[0]['Settings']['User List']['setdeleteuselst'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User List
                   
//Settings User Group
    $module_name="Settings";
    $page_name='User Group';
    $view_action=$permissiondata_array[0]['Settings']['User Group']['setviewusegru'];
    $create_action=$permissiondata_array[0]['Settings']['User Group']['setcreateusegru'];
    $edit_action=$permissiondata_array[0]['Settings']['User Group']['seteditusegru'];
    $delete_action=$permissiondata_array[0]['Settings']['User Group']['setdeleteusegru'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User Group
                  
//Settings User Role
    $module_name="Settings";
    $page_name='User Role';
    $view_action=$permissiondata_array[0]['Settings']['User Role']['setviewuserle'];
    $create_action=$permissiondata_array[0]['Settings']['User Role']['setcreateuserle'];
    $edit_action=$permissiondata_array[0]['Settings']['User Role']['setedituserle'];
    $delete_action=$permissiondata_array[0]['Settings']['User Role']['setdeleteuserle'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings User Role
                  
//Settings Report Template
    $module_name="Settings";
    $page_name='Report Template';
    $view_action=$permissiondata_array[0]['Settings']['Report Template']['setviewtmp'];
    $create_action=$permissiondata_array[0]['Settings']['Report Template']['setcreatetmp'];
    $edit_action=$permissiondata_array[0]['Settings']['Report Template']['setedittmp'];
    $delete_action=$permissiondata_array[0]['Settings']['Report Template']['setdeletetmp'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings Report Template                   

        //Settings Org Chart
    $module_name="Settings";
    $page_name='Org Chart';
    $view_action=$permissiondata_array[0]['Settings']['Org Chart']['setvieworg'];
    $create_action=$permissiondata_array[0]['Settings']['Org Chart']['setcreateorg'];
    $edit_action=$permissiondata_array[0]['Settings']['Org Chart']['seteditorg'];
    $delete_action=$permissiondata_array[0]['Settings']['Org Chart']['setdeleteorg'];
    $hide_action=0;
    $sql  = "INSERT INTO role_permissions(role_id, 	module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action) VALUES(:role_id,:module_name,:page_name,:view_action,:create_action,:edit_action,:delete_action,:hide_action)";
    $stmt    = $pdo->prepare($sql);
    $stmt->execute(
    array(
            ":role_id" => $role_id,                    
            ":module_name" => $module_name,
            ":page_name" =>$page_name,
            ":view_action" =>$view_action,
            ":create_action" =>$create_action,
            ":edit_action" =>$edit_action,
            ":delete_action" =>$delete_action,
            ":hide_action" =>$hide_action
    )
    );
//Settings Org Chart


                        //exit;
                    // Permission Table Entrr

            echo json_encode(array('Error'=>0,'message' => 'Congratulations the record ' . $role_name . ' was updated to the database'));
                }else{
                   echo json_encode(array('Error'=>1,'message' => 'Role name already exists'));  
                }

            //echo json_encode('Congratulations the record ' . $companygroup_name . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the companygroups table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $recordID   =  filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);
         $id   =  filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);
         $role_id   =  filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "DELETE FROM roles WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();


            $sql  = "DELETE FROM role_permissions WHERE role_id = :role_id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':role_id', $role_id, PDO::PARAM_INT);
$stmt->execute();

            echo json_encode('Congratulations the record ' . $role_name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

       case "permissiondata":
         // Sanitise supplied record ID for matching to table record        
         $role_id   =  filter_var($_REQUEST['role_id'], FILTER_SANITIZE_NUMBER_INT); 
          try {
        $stmt    = $pdo->query("SELECT module_name,page_name,view_action,create_action,edit_action,delete_action,hide_action FROM role_permissions where role_id=' $role_id'");
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {  
            $module_name=$row->module_name;
            $page_name=$row->page_name;
            // Dashboard Map
            if($module_name=='Dashboard' && $page_name=='Map'){
                 $row->dashboardviewmap=false; 
                if($row->view_action==1){
                        $row->dashboardviewmap=true; 
                }
                 $row->dashboardcreatemap=false; 
                if($row->create_action==1){
                        $row->dashboardcreatemap=true; 
                } 
                 $row->dashboardeditmap=false; 
                if($row->edit_action==1){
                        $row->dashboardeditmap=true; 
                } 
                 $row->dashboarddeletemap=false; 
                if($row->delete_action==1){
                        $row->dashboarddeletemap=true; 
                } 

                 $row->dashboardhidemap=false; 
                if($row->hide_action==1){
                        $row->dashboardhidemap=true; 
                }
            }
// Dashboard Units

            if($module_name=='Dashboard' && $page_name=='Units'){
                 $row->dashboardviewunits=false; 
                if($row->view_action==1){
                        $row->dashboardviewunits=true; 
                }
                 $row->dashboardcreateunits=false; 
                if($row->create_action==1){
                        $row->dashboardcreateunits=true; 
                } 
                 $row->dashboardeditunits=false; 
                if($row->edit_action==1){
                        $row->dashboardeditunits=true; 
                } 
                 $row->dashboarddeleteunits=false; 
                if($row->delete_action==1){
                        $row->dashboarddeleteunits=true; 
                } 

                 $row->dashboardhideunits=false; 
                if($row->hide_action==1){
                        $row->dashboardhideunits=true; 
                }
            }


      // Calendar Events

            if($module_name=='Calendar' && $page_name=='Events'){
                 $row->calviewevents=false; 
                if($row->view_action==1){
                        $row->calviewevents=true; 
                }
                 $row->calcreateevents=false; 
                if($row->create_action==1){
                        $row->calcreateevents=true; 
                } 
                 $row->caleditevents=false; 
                if($row->edit_action==1){
                        $row->caleditevents=true; 
                } 
                 $row->caldeleteevents=false; 
                if($row->delete_action==1){
                        $row->caldeleteevents=true; 
                }                 
            }

      // Calendar Services
            if($module_name=='Calendar' && $page_name=='Services'){
                 $row->calviewservices=false; 
                if($row->view_action==1){
                        $row->calviewservices=true; 
                }
                 $row->calcreateservices=false; 
                if($row->create_action==1){
                        $row->calcreateservices=true; 
                } 
                 $row->caleditservices=false; 
                if($row->edit_action==1){
                        $row->caleditservices=true; 
                } 
                 $row->caldeleteservices=false; 
                if($row->delete_action==1){
                        $row->caldeleteservices=true; 
                }                 
            }
      // Calendar Alarm
            if($module_name=='Calendar' && $page_name=='Alarm'){
                 $row->calviewalarm=false; 
                if($row->view_action==1){
                        $row->calviewalarm=true; 
                }
                 $row->calcreatealarm=false; 
                if($row->create_action==1){
                        $row->calcreatealarm=true; 
                } 
                 $row->caleditalarm=false; 
                if($row->edit_action==1){
                        $row->caleditalarm=true; 
                } 
                 $row->caldeletealarm=false; 
                if($row->delete_action==1){
                        $row->caldeletealarm=true; 
                }                 
            }

 // Units Units Listing
            if($module_name=='Units' && $page_name=='Units Listing'){
                 $row->univiewlist=false; 
                if($row->view_action==1){
                        $row->univiewlist=true; 
                }
                 $row->unicreatelist=false; 
                if($row->create_action==1){
                        $row->unicreatelist=true; 
                } 
                 $row->unieditlist=false; 
                if($row->edit_action==1){
                        $row->unieditlist=true; 
                } 
                 $row->unideletelist=false; 
                if($row->delete_action==1){
                        $row->unideletelist=true; 
                }                 
            }

// Units Alarm
            if($module_name=='Units' && $page_name=='Alarm'){
                 $row->univiewalarm=false; 
                if($row->view_action==1){
                        $row->univiewalarm=true; 
                }
                 $row->unicreatealarm=false; 
                if($row->create_action==1){
                        $row->unicreatealarm=true; 
                } 
                 $row->unieditalarm=false; 
                if($row->edit_action==1){
                        $row->unieditalarm=true; 
                } 
                 $row->unideletealarm=false; 
                if($row->delete_action==1){
                        $row->unideletealarm=true; 
                }                 
            }
// Units Servicing Info
            if($module_name=='Units' && $page_name=='Servicing Info'){
                 $row->univiewservices=false; 
                if($row->view_action==1){
                        $row->univiewservices=true; 
                }
                 $row->unicreateservices=false; 
                if($row->create_action==1){
                        $row->unicreateservices=true; 
                } 
                 $row->unieditservices=false; 
                if($row->edit_action==1){
                        $row->unieditservices=true; 
                } 
                 $row->unideleteservices=false; 
                if($row->delete_action==1){
                        $row->unideleteservices=true; 
                }                 
            }

// Units Comments
            if($module_name=='Units' && $page_name=='Comments'){
                 $row->univiewcomm=false; 
                if($row->view_action==1){
                        $row->univiewcomm=true; 
                }
                 $row->unicreatecomm=false; 
                if($row->create_action==1){
                        $row->unicreatecomm=true; 
                } 
                 $row->unieditcomm=false; 
                if($row->edit_action==1){
                        $row->unieditcomm=true; 
                } 
                 $row->unideletecomm=false; 
                if($row->delete_action==1){
                        $row->unideletecomm=true; 
                }                 
            }

// Units Unit Group
            if($module_name=='Units' && $page_name=='Unit Group'){
                 $row->univiewgroup=false; 
                if($row->view_action==1){
                        $row->univiewgroup=true; 
                }
                 $row->unicreategroup=false; 
                if($row->create_action==1){
                        $row->unicreategroup=true; 
                } 
                 $row->unieditgroup=false; 
                if($row->edit_action==1){
                        $row->unieditgroup=true; 
                } 
                 $row->unideletegroup=false; 
                if($row->delete_action==1){
                        $row->unideletegroup=true; 
                }                 
            }

// Units Generator Model Management
            if($module_name=='Units' && $page_name=='Generator Model Management'){
                 $row->univiewgmm=false; 
                if($row->view_action==1){
                        $row->univiewgmm=true; 
                }
                 $row->unicreategmm=false; 
                if($row->create_action==1){
                        $row->unicreategmm=true; 
                } 
                 $row->unieditgmm=false; 
                if($row->edit_action==1){
                        $row->unieditgmm=true; 
                } 
                 $row->unideletegmm=false; 
                if($row->delete_action==1){
                        $row->unideletegmm=true; 
                }                 
            }
// Reports Reports
            if($module_name=='Reports' && $page_name=='Reports'){
                 $row->viewreports=false; 
                if($row->view_action==1){
                        $row->viewreports=true; 
                }
                 $row->createreports=false; 
                if($row->create_action==1){
                        $row->createreports=true; 
                } 
                 $row->editreports=false; 
                if($row->edit_action==1){
                        $row->editreports=true; 
                } 
                 $row->deletereports=false; 
                if($row->delete_action==1){
                        $row->deletereports=true; 
                }                 
            }

// Messages Inbox
            if($module_name=='Messages' && $page_name=='Inbox'){
                 $row->msgviewinbox=false; 
                if($row->view_action==1){
                        $row->msgviewinbox=true; 
                }
                 $row->msgcreateinbox=false; 
                if($row->create_action==1){
                        $row->msgcreateinbox=true; 
                } 
                 $row->msgeditinbox=false; 
                if($row->edit_action==1){
                        $row->msgeditinbox=true; 
                } 
                 $row->msgdeleteinbox=false; 
                if($row->delete_action==1){
                        $row->msgdeleteinbox=true; 
                }                 
            }
// Messages Sent
            if($module_name=='Messages' && $page_name=='Sent'){
                 $row->msgviewsent=false; 
                if($row->view_action==1){
                        $row->msgviewsent=true; 
                }
                 $row->msgcreatesent=false; 
                if($row->create_action==1){
                        $row->msgcreatesent=true; 
                } 
                 $row->msgeditsent=false; 
                if($row->edit_action==1){
                        $row->msgeditsent=true; 
                } 
                 $row->msgdeletesent=false; 
                if($row->delete_action==1){
                        $row->msgdeletesent=true; 
                }                 
            }
// Settings My Account
            if($module_name=='Settings' && $page_name=='My Account'){
                 $row->setviewmyacc=false; 
                if($row->view_action==1){
                        $row->setviewmyacc=true; 
                }
                 $row->setcreatemyacc=false; 
                if($row->create_action==1){
                        $row->setcreatemyacc=true; 
                } 
                 $row->seteditmyacc=false; 
                if($row->edit_action==1){
                        $row->seteditmyacc=true; 
                } 
                 $row->setdeletemyacc=false; 
                if($row->delete_action==1){
                        $row->setdeletemyacc=true; 
                }                 
            }

// Settings User List
            if($module_name=='Settings' && $page_name=='User List'){
                 $row->setviewuselst=false; 
                if($row->view_action==1){
                        $row->setviewuselst=true; 
                }
                 $row->setcreateuselst=false; 
                if($row->create_action==1){
                        $row->setcreateuselst=true; 
                } 
                 $row->setedituselst=false; 
                if($row->edit_action==1){
                        $row->setedituselst=true; 
                } 
                 $row->setdeleteuselst=false; 
                if($row->delete_action==1){
                        $row->setdeleteuselst=true; 
                }                 
            }

// Settings User List
            if($module_name=='Settings' && $page_name=='User Group'){
                 $row->setviewusegru=false; 
                if($row->view_action==1){
                        $row->setviewusegru=true; 
                }
                 $row->setcreateusegru=false; 
                if($row->create_action==1){
                        $row->setcreateusegru=true; 
                } 
                 $row->seteditusegru=false; 
                if($row->edit_action==1){
                        $row->seteditusegru=true; 
                } 
                 $row->setdeleteusegru=false; 
                if($row->delete_action==1){
                        $row->setdeleteusegru=true; 
                }                 
            }
// Settings User Role
            if($module_name=='Settings' && $page_name=='User Role'){
                 $row->setviewuserle=false; 
                if($row->view_action==1){
                        $row->setviewuserle=true; 
                }
                 $row->setcreateuserle=false; 
                if($row->create_action==1){
                        $row->setcreateuserle=true; 
                } 
                 $row->setedituserle=false; 
                if($row->edit_action==1){
                        $row->setedituserle=true; 
                } 
                 $row->setdeleteuserle=false; 
                if($row->delete_action==1){
                        $row->setdeleteuserle=true; 
                }                 
            }
// Settings Report Template
            if($module_name=='Settings' && $page_name=='Report Template'){
                 $row->setviewtmp=false; 
                if($row->view_action==1){
                        $row->setviewtmp=true; 
                }
                 $row->setcreatetmp=false; 
                if($row->create_action==1){
                        $row->setcreatetmp=true; 
                } 
                 $row->setedittmp=false; 
                if($row->edit_action==1){
                        $row->setedittmp=true; 
                } 
                 $row->setdeletetmp=false; 
                if($row->delete_action==1){
                        $row->setdeletetmp=true; 
                }                 
            }
// Settings Org Chart
            if($module_name=='Settings' && $page_name=='Org Chart'){
                 $row->setvieworg=false; 
                if($row->view_action==1){
                        $row->setvieworg=true; 
                }
                 $row->setcreateorg=false; 
                if($row->create_action==1){
                        $row->setcreateorg=true; 
                } 
                 $row->seteditorg=false; 
                if($row->edit_action==1){
                        $row->seteditorg=true; 
                } 
                 $row->setdeleteorg=false; 
                if($row->delete_action==1){
                        $row->setdeleteorg=true; 
                }                 
            }
        $data[] = $row;
        }

        // Return data as JSON
        echo json_encode($data);
        }
        catch(PDOException $e)
        {
        echo $e->getMessage();
        }


      break;

      

   }
?>