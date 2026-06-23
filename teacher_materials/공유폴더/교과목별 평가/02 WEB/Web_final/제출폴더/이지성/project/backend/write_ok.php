<?php
    session_start();
    header('Content-Type:text/html; charset=utf-8');

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');
    mysqli_query($db, 'set names utf8');

    $user_no = $_SESSION['user_no'];
    $category = $_POST['category'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    $board_img = $_FILES['board_img']['name'];

    if($board_img !=''){
        move_uploaded_file(
            $_FILES['board_img']['tmp_name'],
            "../uploads/board/".$board_img
        );
    }

    $sql = "INSERT INTO mbca_board
            (user_no,category,title,content,board_img)
            VALUES
            ('$user_no','$category','$title','$content','$board_img')";
    $result = mysqli_query($db, $sql);

    if($result){
        header("Location:../board/board.php");
        
    }else{
        echo "<script>
        alert('글 등록에 실패하였습니다');
        history.back();
        </script>";
    }


?>