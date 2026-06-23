<?php
    header('Content-Type:text/plain; charset=utf-8');

    // 사용자가 json으로 데이터를 보내면 php언어는 특정 위치(php://input) 에 이 값을 파일로 보관함
    // 그래서 그 파일을 읽어와야 함

    $json_data = file_get_contents('php://input');
    // json 형식의 문자열에서 값들의 추출을 쉽게 하기위해 연관배열로 해독해내기
    $datas = json_decode($json_data, true); // true : 연관배열로 만들지 여부

    // 데이터들에서 각 값들을 추출(제목, 글쓴이, 비밀번호, 메세지)
    $title = $datas['title'];
    $writer = $datas['writer'];
    $message = $datas['msg'];
    $user_id = $datas['user_id'];

    // 게시글 저장날짜
    $date = date('Y-m-d');

    // board 테이블 안에 새로운 게시글을 저장
    // 테이블 컬룸들 : no, title, writer, date, msg , user_id
    // 저장할 값들 : $title, $writer, $date, $message , $user_id

    // MySQL DBMS과 연결하여 위 값들을 삽입하기
    $db = mysqli_connect('localhost','nr2026','a1s2d3f4!','nr2026');
    mysqli_query($db,'set names utf8');

    //원하는 쿼리 작성
    $sql = "INSERT INTO meeting(title,writer,date,msg,user_id) VALUES('$title','$writer','$date','$message','$user_id')";
    
    $result = mysqli_query($db,$sql); // 실행 결과를 true/false로 줌

    if($result) echo "글 저장을 성공했습니다";
    else echo "글 저장 중 오류가 발생했습니다. 다시 시도해 주세요";

    mysqli_close($db);


?>