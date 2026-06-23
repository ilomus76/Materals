<?php

$conn = mysqli_connect(
    "localhost",
    "mbcaadmin",
    "a1s2d3f4!",
    "mbcaadmin"
);

if(!$conn){
    die("DB 연결 실패 : " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");

?>