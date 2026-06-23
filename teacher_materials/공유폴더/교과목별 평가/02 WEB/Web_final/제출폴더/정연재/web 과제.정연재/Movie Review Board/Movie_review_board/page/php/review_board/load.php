<?php

$keyword = $_GET['keyword'] ?? '';

include('../db.php');

$keyword = $_GET['keyword'] ?? '';

if($keyword != ''){

    $sql =
    "SELECT *
     FROM review_board
     WHERE review_title LIKE '%$keyword%'
     OR movie_title LIKE '%$keyword%'
     ORDER BY no DESC";

}else{

    $sql =
    "SELECT *
     FROM review_board
     ORDER BY no DESC";

}

$result = mysqli_query($db, $sql);

$arr = array();

while($row = mysqli_fetch_assoc($result)){

    $arr[] = $row;

}

echo json_encode($arr);

?>