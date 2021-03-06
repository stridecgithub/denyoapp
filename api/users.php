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
        //echo '<pre>';
print_r($_REQUEST);
//echo json_decode($_REQUEST['userdata']);

//var_dump(json_encode($_REQUEST['userdata']));
 //echo $_REQUEST['userdata'][0]['job_position'];
   /* foreach ($var as $value) {
       //echo $value[$var];
       echo "dsfsdf";
       echo $var;
    }*/
        // Sanitise URL supplied values
        $username       = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $password   = filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $role   = filter_var($_REQUEST['role'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $hashtag   = filter_var($_REQUEST['hashtag'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);



        // Attempt to run PDO prepared statement
        try {

                // Insert into user table
               

                 $firstname       = filter_var($_REQUEST['firstname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $lastname   = filter_var($_REQUEST['lastname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $email   = filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $country   = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $contact   = filter_var($_REQUEST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $photo   = filter_var($_REQUEST['photo'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $job_position   = filter_var($_REQUEST['job_position'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $report_to   = filter_var($_REQUEST['report_to'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                $company_group   = filter_var($_REQUEST['company_group'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
                // Insert into userdetails table
                $sql  = "INSERT INTO staffs(firstname,lastname,email,coucountry_idntry,contact_number,photo,job_position,report_to,company_id) VALUES(:user_id, :firstname, :lastname, :email,:country,:contact,:photo,:job_position,:report_to,:company_group)";
                $stmt    = $pdo->prepare($sql);
                $stmt->execute(
                array(
                    ":user_id" => $user_id,
                    ":firstname" => $firstname,
                    ":lastname" => $lastname,
                    ":email" => $email,
                    ":country" => $country,
                    ":contact" =>$contact,
                    ":photo" =>$photo,
                    ":job_position" =>$job_position,
                    ":report_to" =>$report_to,
                    ":company_group" =>$company_group
                )
                );

               // $insertId = $stmt->fetch(PDO::FETCH_ASSOC);
                $staff_id=$pdo->lastInsertId();
               
 $sql  = "INSERT INTO userstmp(username, password,staff_id) VALUES(:username, :password,:staff_id)";
                $stmt    = $pdo->prepare($sql);
                $stmt->execute(
                array(
                ":username" => $username,
                ":password" => $password,
                ":staff_id" => $staff_id
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
           // $orderby="order by u.".$sortname." ".$sortascdesc;  
           $orderby='';
        }
        
        $limit="limit ".$startIndex.",".$results;
        $wheredate="";  
       // echo "select u.username,ud.firstname,ud.lastname,ud.email,cg.companygroup_name from userstmp as u,userdetails as ud,companygroups as cg where ".$wheredate." ".$orderby." ".$limit;      
        try {

       
//echo "select u.user_id as userid,u.username,u.password,cg.companygroup_name from userstmp as u,companygroups as cg ".$wheredate." ".$orderby." ".$limit;exit;

        $stmt    = $pdo->query("select u.user_id as userid,u.username,u.password,cg.companygroup_name from userstmp as u,companygroups as cg ".$wheredate." ".$orderby." ".$limit);
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

    case "all": 
       // echo "select u.username,ud.firstname,ud.lastname,ud.email,cg.companygroup_name from userstmp as u,userdetails as ud,companygroups as cg where ".$wheredate." ".$orderby." ".$limit;      
        try {
        $stmt    = $pdo->query("select u.user_id,u.username,ud.firstname,ud.lastname,ud.email from userstmp as u,staffs as ud where u.user_id=ud.staff_id");
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
//print_r($_REQUEST);
         // Sanitise URL supplied values
            $username       = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $password   = filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $role   = filter_var($_REQUEST['role'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $hashtag   = filter_var($_REQUEST['hashtag'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

           $id=$_REQUEST['recordID'];
           $user_id=$_REQUEST['recordID'];

         // Attempt to run PDO prepared statement
         try {             
            $sql  = "UPDATE userstmp SET username = :username, password = :password, role = :role, hashtag = :hashtag, updatedby = :updatedby, updatedon = :updatedon WHERE user_id = :user_id";
            //exit;
            $stmt =  $pdo->prepare($sql);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->bindParam(':role', $role, PDO::PARAM_STR);
            $stmt->bindParam(':hashtag', $hashtag, PDO::PARAM_STR);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':updatedby', $createdby_updatedby, PDO::PARAM_INT);
            $stmt->bindParam(':updatedon', $createdon_updatedon, PDO::PARAM_INT);
            $stmt->execute();
 //print_r($stmt);

            $firstname       = filter_var($_REQUEST['firstname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $lastname   = filter_var($_REQUEST['lastname'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $email   = filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $country   = filter_var($_REQUEST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $contact   = filter_var($_REQUEST['contact'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $photo   = filter_var($_REQUEST['photo'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $job_position   = filter_var($_REQUEST['job_position'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $report_to   = filter_var($_REQUEST['report_to'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $company_group   = filter_var($_REQUEST['company_group'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            $sql  = "UPDATE staffs SET firstname = :firstname, lastname = :lastname, email = :email, country = :country, contact = :contact, photo = :photo,job_position=:job_position,report_to=:report_to,company_group=:company_group WHERE user_id = :user_id";
            //exit;
            $stmt =  $pdo->prepare($sql);
            $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
            $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':country', $country, PDO::PARAM_STR);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':contact', $contact, PDO::PARAM_INT);
            $stmt->bindParam(':photo', $photo, PDO::PARAM_INT);
            $stmt->bindParam(':job_position', $job_position, PDO::PARAM_INT);
            $stmt->bindParam(':report_to', $report_to, PDO::PARAM_INT);
            $stmt->bindParam(':company_group', $company_group, PDO::PARAM_INT);
            $stmt->execute();

            //print_r($stmt);

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
        $id=$_REQUEST['recordID'];
        $user_id=$_REQUEST['recordID'];
         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "DELETE FROM userstmp WHERE user_id = :user_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();

            $sql  = "DELETE FROM staffs WHERE user_id = :user_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();


            echo json_encode('Congratulations the record ' . $companygroup_name . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
      // EmailId already  userstmp table
        case "emailexist":
        // Sanitise URL supplied values       
        $email   = filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        // Attempt to run PDO prepared statement
        try {
                $sql = "select count(*) from staffs where email='$email'"; 
                $result = $pdo->prepare($sql); 
                $result->execute(); 
                $number_of_rows = $result->fetchColumn(); 
                if($number_of_rows>0){                   
                      echo json_encode(array('Error'=>1,'message' => 'Emailid already exists'));  
                }else{
                     echo json_encode(array('Error'=>0,'message' => 'Emailid is veryfied ok')); 
                }
               
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
            echo json_encode(array('message' => $e->getMessage()));
        //echo $e->getMessage();
        }
        break;

case "usernameexist":
        // Sanitise URL supplied values       
        $username   = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        // Attempt to run PDO prepared statement
        try {
                $sql = "select count(*) from userstmp where username='$username'"; 
                $result = $pdo->prepare($sql); 
                $result->execute(); 
                $number_of_rows = $result->fetchColumn(); 
                if($number_of_rows>0){                   
                      echo json_encode(array('Error'=>1,'message' => 'Username already exists'));  
                }else{
                     echo json_encode(array('Error'=>0,'message' => 'Username is veryfied ok')); 
                }
               
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
            echo json_encode(array('message' => $e->getMessage()));
        //echo $e->getMessage();
        }
        break;

         case "myaccount":
            $userId=$_REQUEST['userId'];       
            $wheredate="u.user_id=ud.staff_id and ud.company_id=cg.companygroup_id and u.user_id='$userId'";  
        try {
            $stmt    = $pdo->query("select u.user_id as userid,ud.staff_id as userdetailsid,u.username,u.password,ud.firstname,ud.lastname,ud.email,ud.contact_number,ud.country_id,ud.photo,ud.job_position,ud.report_to,ud.company_id,ud.role_id,cg.companygroup_name from userstmp as u,staffs as ud,companygroups as cg where ".$wheredate);
            $row  = $stmt->fetch(PDO::FETCH_OBJ);

            $sql = "select country_name from countries where id=". $row->country_id; 
            $result = $pdo->prepare($sql); 
            $result->execute(); 
            $country_name = $result->fetchColumn(); 
            $row->country=$country_name;

           $sql = "select role_name from roles where role_id=". $row->role_id; 
            $result = $pdo->prepare($sql); 
            $result->execute(); 
            $role_name = $result->fetchColumn(); 
            $row->role=$role_name;
/*
            $sql = "select username from userstmp where user_id=". $row->report_to; 
            $result = $pdo->prepare($sql); 
            $result->execute(); 
            $account_name = $result->fetchColumn(); 
            $row->report_to=$account_name;
            */

            $data[] = $row;
            echo json_encode($data);
        }
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
        break;
        
   }

       

?>