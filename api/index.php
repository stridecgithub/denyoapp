<?php

extract($_POST);
extract($_GET);
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$mysqli = new mysqli("localhost", "root", "", "ionic");

if (isset($getaction)) {
    if ($getaction == 'userlist') {
        $query = "SELECT id,username,email FROM users";
        $dbresult = $mysqli->query($query);

        while ($row = $dbresult->fetch_array(MYSQLI_ASSOC)) {

            $data[] = $row;
        }

        if ($dbresult) {
            $result = "{'success':true, 'data':" . json_encode($data) . "}";
        } else {
            $result = "{'success':false}";
        }
        echo $result;
    }
}

if (isset($postaction)) {

}