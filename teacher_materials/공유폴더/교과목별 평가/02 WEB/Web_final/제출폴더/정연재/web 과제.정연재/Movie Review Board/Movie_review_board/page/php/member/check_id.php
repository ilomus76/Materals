<?php

include('../db.php');

$user_id = $_POST['user_id'];

$sql = "SELECT * FROM member WHERE user_id='$user_id'";

$result = mysqli_query($db, $sql);

$row = mysqli_num_rows($result);

if($row > 0){

    echo "fail";

}else{

    echo "success";

}

?>