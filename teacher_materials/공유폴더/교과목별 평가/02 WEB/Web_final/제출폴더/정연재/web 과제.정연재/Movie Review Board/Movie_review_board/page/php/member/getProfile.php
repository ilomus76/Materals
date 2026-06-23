<?php

session_start();

include("../db.php");

$user_id = $_SESSION['user_id'];

$sql =
"SELECT profile_image
 FROM member
 WHERE user_id='$user_id'";

$result = mysqli_query($db,$sql);

$row = mysqli_fetch_assoc($result);

echo $row['profile_image'];

?>