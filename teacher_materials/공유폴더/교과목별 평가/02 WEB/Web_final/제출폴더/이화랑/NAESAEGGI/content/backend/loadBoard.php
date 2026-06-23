<?php
    header('Content-Type:application/json; charset=utf-8');

    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db, 'set names utf8');

    $sql = "SELECT * FROM meeting ORDER BY no DESC";
    $result = mysqli_query($db,$sql);


    $board_list = [];

    $num = mysqli_num_rows($result);

    for($i=0; $i<$num; $i++){
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $board_list[$i] = $row;
    }

    mysqli_close($db);
    
    
    echo json_encode($board_list);


?>