<?php
    header('Content-Type:text/plain; charset=utf-8');

    // PHP는 사용자가 보낸 json body를 파일로 받기에..이를 읽어와야 함
    $jsonData= file_get_contents('php://input');
    echo "요청한 데이터 확인 : $jsonData\n";

    //실제 작업은 json 문자열을 분석하여 각 값들을 DB에 저장
    $data= json_decode($jsonData, true); //json 문자열을 연관배열로
    $gender= $data['gender'];
    //나머지 들도 식별자를 통해 구별하여 값 받기 가능.

?>