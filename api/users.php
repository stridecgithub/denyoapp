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
    $createdon_updatedon=date("Y-m-d h:i:s",time());
 $createdby_updatedby   = filter_var($_REQUEST['createdby'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

   // Determine which mode is being requested
   switch($key)
   {

        // Add a new record to the companygroups table
        case "create":
print_r($_REQUEST);
echo json_decode($_REQUEST['userdata']);

 $var = get_object_vars($_REQUEST['userdata']);
    foreach ($var as &$value) {
        print_r($value);
    }
        // Sanitise URL supplied values
        $companygroup_name       = filter_var($_REQUEST['companygroup_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $address   = filter_var($_REQUEST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $country   = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $contact   = filter_var($_REQUEST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);



        // Attempt to run PDO prepared statement
        try {
                $sql  = "INSERT INTO companygroups(companygroup_name, address,country,contact,createdby,createdon) VALUES(:companygroup_name, :address, :country, :contact,:createdby,:createdon)";
                $stmt    = $pdo->prepare($sql);
                $stmt->execute(
                array(
                ":companygroup_name" => $companygroup_name,
                ":address" => $address,
                ":country" => $country,
                ":contact" => $contact,
                ":createdby" => $createdby_updatedby,
                ":createdon" =>$createdon_updatedon

                )
                );
                echo json_encode(array('message' => 'Congratulations the record ' . $companygroup_name . ' was added to the database'));
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
        echo $e->getMessage();
        }

        break;

    case "run":

        $sortname=$_REQUEST['sort'];
        $sortascdesc=$_REQUEST['dir'];
        $startIndex=$_REQUEST['startIndex'];
        $results=$_REQUEST['results']; 
        if($sortname=='companygroup_name'){
            $orderby="order by cg.".$sortname." ".$sortascdesc;
        }else{
            $orderby="order by u.".$sortname." ".$sortascdesc;  
        }
        
        $limit="limit ".$startIndex.",".$results;
        $wheredate="u.id=ud.user_id and ud.company_group=cg.companygroup_id";  
       // echo "select u.username,ud.first_name,ud.last_name,ud.email,cg.companygroup_name from users as u,userdetails as ud,companygroups as cg where ".$wheredate." ".$orderby." ".$limit;      
        try {

        //$sql = "SELECT count(*) as totalCount FROM companygroups"; 
        $sql = "select count(*) from users as u,userdetails as ud,companygroups as cg where ".$wheredate; 
        $result = $pdo->prepare($sql); 
        $result->execute(); 
        $number_of_rows = $result->fetchColumn(); 


        $stmt    = $pdo->query("select u.username,ud.first_name,ud.last_name,ud.email,cg.companygroup_name from users as u,userdetails as ud,companygroups as cg where ".$wheredate." ".$orderby." ".$limit);
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
       // echo "select u.username,ud.first_name,ud.last_name,ud.email,cg.companygroup_name from users as u,userdetails as ud,companygroups as cg where ".$wheredate." ".$orderby." ".$limit;      
        try {
        $stmt    = $pdo->query("select u.id,u.username,ud.first_name,ud.last_name,ud.email from users as u,userdetails as ud where u.id=ud.user_id");
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

      // Update an existing record in the companygroups table
      case "update":
print_r($_REQUEST);
         // Sanitise URL supplied values
         $companygroup_name          = filter_var($_REQUEST['companygroup_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $address   = filter_var($_REQUEST['address'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
          $country   = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
           $contact   = filter_var($_REQUEST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $recordID      = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {             
            $sql  = "UPDATE companygroups SET companygroup_name = :companygroup_name, address = :address, contact = :contact, country = :country, updatedby = :updatedby, updatedon = :updatedon WHERE companygroup_id = :recordID";
            //exit;
                $stmt =  $pdo->prepare($sql);
                $stmt->bindParam(':companygroup_name', $companygroup_name, PDO::PARAM_STR);
                $stmt->bindParam(':address', $address, PDO::PARAM_STR);
                $stmt->bindParam(':contact', $contact, PDO::PARAM_STR);
                $stmt->bindParam(':country', $country, PDO::PARAM_STR);
                $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
                 $stmt->bindParam(':updatedby', $createdby_updatedby, PDO::PARAM_INT);
                 $stmt->bindParam(':updatedon', $createdon_updatedon, PDO::PARAM_INT);
                $stmt->execute();
            print_r($stmt);

            echo json_encode('Congratulations the record ' . $companygroup_name . ' was updated');
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

            echo json_encode('Congratulations the record ' . $companygroup_name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>