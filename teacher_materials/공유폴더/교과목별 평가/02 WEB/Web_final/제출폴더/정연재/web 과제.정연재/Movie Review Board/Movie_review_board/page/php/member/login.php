<?php

session_start();

include('../db.php');

$user_id = $_POST['user_id'];
$user_pw = $_POST['user_pw'];

$sql = "SELECT * FROM member
        WHERE user_id='$user_id'
        AND user_pw='$user_pw'";

$result = mysqli_query($db, $sql);

$row = mysqli_fetch_assoc($result);

if($row){

    $_SESSION['user_id'] = $row['user_id'];

    $_SESSION['user_nickname'] =
        $row['user_nickname'];

    // $_SESSION['profile_image'] =
    //     $row['profile_image'];

    echo "success";

}else{

    echo "fail";

}

?>