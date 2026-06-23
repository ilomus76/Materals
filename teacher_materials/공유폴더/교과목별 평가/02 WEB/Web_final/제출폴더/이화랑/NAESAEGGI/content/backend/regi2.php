<?php
    header('Content-Type:text/plain; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);

    $petname = $datas['petname'];
    $type = $datas['type'];
    $imgData = $datas['image'];
    $owner_id = $datas['owner_id'];


    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    $sql = "INSERT INTO pet_info(petname,type,imgData,owner_id) VALUES ('$petname','$type','$imgData','$owner_id')";
    $result = mysqli_query($db,$sql);

    if($result) echo "내새끼 정보를 입력했습니다";
    else echo "실패하였습니다 다시 시도해주세요";

    mysqli_close($db);


?>