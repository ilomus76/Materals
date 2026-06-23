<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $id = $datas['id'];

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db, 'set names utf8');

    $sql = "DELETE FROM member_info WHERE id = '$id'";
    $result = mysqli_query($db, $sql);

    if($result){
        echo "탈퇴 완료";
    }else{
        echo "탈퇴 실패";
    }

    mysqli_close($db);
?>