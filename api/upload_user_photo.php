<?php
extract($_POST);
extract($_GET);
extract($_REQUEST);
extract($_FILES);
ini_set("upload_max_filesize","20M");
$target_dir = "uploads/users/";
$baseURL="denyoappv2.stridecdev.com";
$fullURL="";
$data = array();
   //$filesize = (filesize($_FILES['file']['name']) * .0009765625) * .0009765625; // bytes to MB
$userfile_extn = explode(".", strtolower($_FILES['file']['name']));
if($userfile_extn[1]==''){
    $rand = mt_rand(100000,999999); 
    $filename=basename(str_replace("%","",$_FILES["file"]["name"])).'_'.$rand.'_attachment'.'.jpg';
    $target_file=$target_dir . basename(str_replace("%","",$_FILES["file"]["name"])).'_'.$rand.'_attachment'.'.jpg';
    $ext="jpg";
}else{
     $filename=basename($_FILES["file"]["name"]);
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
     $ext=$userfile_extn[1];
}
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        //echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
    } else {
        //echo "Sorry, there was an error uploading your file.";
    }
     $data['fileName'] = $filename;
     $data['baseURL'] = $baseURL;
     $data['ext'] = $ext;
      $data['target_dir'] ="uploads/users/"; 
     //  $data['filesize'] = $filesize; 
      echo json_encode($data);
?>