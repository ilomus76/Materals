<?php

    session_start();

    include('../db.php');

    $movie_title = $_POST['movie_title'];
    $review_title = $_POST['review_title'];
    $review_content = $_POST['review_content'];

    $user_id = $_SESSION['user_id'];


    $sql = "INSERT INTO review_board
            (movie_title, review_title, review_content, user_id)
            VALUES
            ('$movie_title', '$review_title', '$review_content', '$user_id')";

    $result = mysqli_query($db, $sql);

    if($result){

        echo "success";

    }else{

        echo "fail";

    }
?>
