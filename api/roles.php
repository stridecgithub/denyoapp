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

         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "DELETE FROM roles WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $role_name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }
?>