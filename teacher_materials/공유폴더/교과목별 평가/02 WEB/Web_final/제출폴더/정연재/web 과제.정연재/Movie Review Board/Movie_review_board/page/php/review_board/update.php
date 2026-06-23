<?php

session_start();

include('../db.php');

$no = $_POST['no'];

$movie_title = $_POST['movie_title'];
$review_title = $_POST['review_title'];
$review_content = $_POST['review_content'];

$sql = "UPDATE review_board
        SET movie_title='$movie_title',
            review_title='$review_title',
            review_content='$review_content'
        WHERE no='$no'";

$result = mysqli_query($db,$sql);

if($result){

    echo "success";

}else{

    echo "fail";

}

?>