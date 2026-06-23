<?php
    header('Content-Type:text/plain; charset=utf-8');

    $jsonData = file_get_contents('php://input');
    $datas = json_decode($jsonData, true);

    $id = $datas['id'];
    $pw = $datas['pw'];

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    $sql = "SELECT * FROM member_info WHERE id='$id'";
    $result = mysqli_query($db,$sql);

    $num_row = mysqli_num_rows($result);

    if($num_row == 0){
        echo "아이디 또는 비밀번호가 틀렸습니다";
    }else{
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

        $hashpw = $row['pw'];

        if(password_verify($pw, $hashpw)){
            echo "로그인에 성공하였습니다";
        }else{
            echo "아이디 또는 비밀번호가 틀렸습니다";
        }
    }
    mysqli_close($db);

?>