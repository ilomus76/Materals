<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $id = $datas['id'];
    $new_pw = $datas['pw'];

    $hashed_pw = password_hash($new_pw, PASSWORD_DEFAULT);

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db, 'set names utf8');

    $sql = "UPDATE member_info SET pw = '$hashed_pw' WHERE id = '$id'";
    $result = mysqli_query($db, $sql);

    if($result){
        echo "수정 완료";
    }else{
        echo "수정 실패";
    }

    mysqli_close($db);
?>