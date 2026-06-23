<?php

    session_start();

    header('Content-Type:text/html; charset=utf-8');

    if(!isset($_SESSION['user_no'])){
        echo "
            <script>
                alert('로그인이 필요합니다.');
                location.href='../index.html';
            </script>
        ";
        exit;
    }

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');
    mysqli_query($db, 'set names utf8');

    $user_no = $_SESSION['user_no'];
    $nickname = $_POST['nickname'];

    if($_FILES['profile_img']['name'] == ''){

        $sql = "UPDATE mbca_user SET nickname='$nickname'
                WHERE no='$user_no'";

    }else{

        $profile_img = $_FILES['profile_img']['name'];
        $tmp_name = $_FILES['profile_img']['tmp_name'];

        move_uploaded_file($tmp_name, "../uploads/".$profile_img);

        $sql = "UPDATE mbca_user SET nickname='$nickname', profile_img='$profile_img'
                WHERE no='$user_no'";
    }

    mysqli_query($db, $sql);

    echo "
        <script>
            alert('프로필이 수정되었습니다.');
            location.href='../board/mypage.php';
        </script>
    ";

?>