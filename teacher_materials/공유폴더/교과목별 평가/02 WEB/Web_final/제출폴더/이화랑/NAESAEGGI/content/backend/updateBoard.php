<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $no = $datas['no'];
    $title = $datas['title'];
    $writer = $datas['writer'];
    $msg = $datas['msg'];


    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    $sql = "UPDATE meeting SET title='$title' , writer='$writer' , msg = '$msg' WHERE no = '$no'";
    $result = mysqli_query($db,$sql);

    if($result){
        echo "수정 완료";
    }else{
        echo "수정 실패 다시 시도해주세요";
    }

?>