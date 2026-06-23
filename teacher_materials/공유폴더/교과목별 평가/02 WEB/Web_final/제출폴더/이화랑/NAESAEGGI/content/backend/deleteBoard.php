<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $no = $datas['no'];

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db, 'set names utf8');

    $sql = "DELETE FROM meeting WHERE no = '$no'";
    $result = mysqli_query($db,$sql);

    if($result){
        echo "삭제 완료";
    }else{
        echo "삭제 실패 다시 시도해주세요";
    }

    mysqli_close($db);


?>