<?php
    header('Content-Type:text/html; charset=utf-8');

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');
    mysqli_query($db, 'set names utf8');

    $user_id = $_POST['user_id'];
    $user_pw = $_POST['user_pw'];
    $user_name = $_POST['user_name'];
    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $profile_img = $_FILES['profile_img']['name'];

    if($user_id == '' || $user_pw == ''){
        echo "
            <script>
                alert('아이디와 비밀번호를 입력해주세요.');
                history.back();
            </script>
        ";
        exit;
    }

    if($profile_img != ''){
        move_uploaded_file(
            $_FILES['profile_img']['tmp_name'],
            "../uploads/profile/".$profile_img
        );
    }

    $sql = "INSERT INTO mbca_user
            (user_id, user_pw, user_name, nickname, email, profile_img)
            VALUES
            ('$user_id', '$user_pw', '$user_name', '$nickname', '$email', '$profile_img')";

    $result = mysqli_query($db, $sql);

    if($result){
        header("Location:../board/login.html");
    }else{
        echo "
            <script>
                alert('회원가입에 실패했습니다.'); 
                history.back();
            </script>
        ";
    }

?>