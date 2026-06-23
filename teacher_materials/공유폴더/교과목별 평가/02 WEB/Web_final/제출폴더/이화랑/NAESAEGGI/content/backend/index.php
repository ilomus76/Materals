<?php
    header('Content-Type:application/json; charset=utf-8');

    $json_data = file_get_contents('php://input');
    $datas = json_decode($json_data, true);
    $owner_id = $datas['owner_id'];

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    $sql = "SELECT * FROM pet_info WHERE owner_id = '$owner_id'";
    $result = mysqli_query($db,$sql);

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    echo json_encode($row);
    mysqli_close($db);

?>

