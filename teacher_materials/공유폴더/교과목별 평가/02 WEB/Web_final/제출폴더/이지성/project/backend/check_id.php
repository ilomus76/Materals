<?php

    header('Content-Type:text/html; charset=utf-8');

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');

    mysqli_query($db, 'set names utf8');

    $user_id = $_GET['user_id'];

    $sql = "SELECT *FROM mbca_user WHERE user_id='$user_id'";

    $result = mysqli_query($db, $sql);

    $count = mysqli_num_rows($result);

    if($count > 0){
        echo 'exist';
    }
    else{
        echo 'ok';
    }

?>