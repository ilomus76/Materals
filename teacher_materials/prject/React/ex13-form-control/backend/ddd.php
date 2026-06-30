<?php
    header('Content-Type:text/plain; charset=utf-8');

    //1) 글씨 데이터 받기
    $nickname= $_POST['nickname'];
    echo "닉네임: $nickname \n\n";

    //2) 전송된 파일들의 실제데이터는 임시저장소에 있고. 여기는 파일정보만 오게됨
    $files= $_FILES['img'];

    //여러개의 파일을 보냈을 수도 있기에..파일의 개수 얻어오기
    $file_num= count( $files['name'] );
    echo "전송된 파일의 개수 : $file_num \n";
    echo "=============================\n";

    //파일 개수만큼 반복하면서 파일정보 응답... 임시저장소의 파일을 서버에 저장
    for($i=0; $i<$file_num; $i++){
        $filename= $files['name'][$i];
        $filesize= $files['size'][$i];
        $tempname= $files['tmp_name'][$i]; //임시저장소의 파일 위치
        move_uploaded_file($tempname, "./uploaded/" . $filename);

        echo "$filename \n";
        echo "$filesize \n";
        echo "----------\n";
    }





?>