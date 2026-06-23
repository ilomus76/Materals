<?php

session_start();

include("../db.php");

$user_id = $_SESSION['user_id'];

$file = $_FILES['img'];

$fileName =
    time()."_".$file['name'];

$uploadPath =
    "../../image/".$fileName;

move_uploaded_file(
    $file['tmp_name'],
    $uploadPath
);

$sql = "
UPDATE member
SET profile_image='$fileName'
WHERE user_id='$user_id'
";

mysqli_query($db,$sql);

echo "success";

?>