<?php

include('../db.php');

$user_id = $_POST['user_id'];
$user_pw = $_POST['user_pw'];
$user_email = $_POST['user_email'];
$birth = $_POST['birth'];
$user_gender = $_POST['user_gender'];
$user_nickname = $_POST['user_nickname'];

$sql = "INSERT INTO member
(user_id, user_pw, user_email, user_nickname, birth, user_gender)
VALUES
('$user_id', '$user_pw', '$user_email', '$user_nickname', '$birth', '$user_gender')";

$result = mysqli_query($db, $sql);

if($result){
    echo "success";
}else{
    echo "fail";
}

?>