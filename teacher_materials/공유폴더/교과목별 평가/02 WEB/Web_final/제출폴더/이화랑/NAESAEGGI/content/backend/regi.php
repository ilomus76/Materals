<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $id = $datas['id'];
    $pw = $datas['pw'];

    $hashpw = password_hash($pw, PASSWORD_DEFAULT);

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    $sql = "INSERT INTO member_info(id,pw) VALUES ('$id','$hashpw')";
    $result = mysqli_query($db,$sql);

    if($result) echo "회원가입에 성공하였습니다";
    else echo "회원가입에 실패하였습니다 다시 시도해주세요";

    mysqli_close($db);


?>