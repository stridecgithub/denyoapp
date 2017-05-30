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

   // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   $data    = array();
    $now=date("Y-m-d h:i:s",time());


   // Determine which mode is being requested
   switch($key)
   {

      // Add a new record to the companygroups table
      case "create":

         // Sanitise URL supplied values
         $companyname       = filter_var($_REQUEST['companyname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $address   = filter_var($_REQUEST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
          $country   = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
           $contact   = filter_var($_REQUEST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
           $createdby   = filter_var($_REQUEST['createdby'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         

         // Attempt to run PDO prepared statement
         try {
            $sql  = "INSERT INTO companygroups(companygroup_name, address,country,contact,createdby,createdon) VALUES(:companyname, :address, :country, :contact,:createdby,:createdon)";
            $stmt    = $pdo->prepare($sql);
            $stmt->execute(
                array(
                    ":companyname" => $companyname,
                     ":address" => $address,
                     ":country" => $country,
                     ":contact" => $contact,
                     ":createdby" => $createdby,
                      ":createdon" =>$now
                     
                    )
                    );
            echo json_encode(array('message' => 'Congratulations the record ' . $companyname . ' was added to the database'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;

 case "run":
 $wheredate="deletestatus='0'";
    try {
          $stmt    = $pdo->query("SELECT companygroup_id,companygroup_name,country,address,contact FROM companygroups where ".$wheredate);
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
 break;
      // Update an existing record in the companygroups table
      case "update":

         // Sanitise URL supplied values
         $companyname          = filter_var($_REQUEST['companyname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $address   = filter_var($_REQUEST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         
         $recordID      = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql  = "UPDATE companygroups SET companygroup_name = :companyname, address = :address WHERE companygroup_id = :recordID";
            //exit;
            $stmt =  $pdo->prepare($sql);
            $stmt->bindParam(':companyname', $companyname, PDO::PARAM_STR);
            $stmt->bindParam(':address', $address, PDO::PARAM_STR);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $name . ' was updated');
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

         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "DELETE FROM companygroups WHERE companygroup_id = :recordID";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $companyname . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>