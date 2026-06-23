<?php

    session_start();
    
    header('Content-Type:text/html; charset=utf-8');

    if(!isset($_SESSION['user_no'])){
        echo "
            <script>
                alert('로그인이 필요합니다.');
                location.href='../index.html';
            </script>
        ";
        exit;
    }

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');

    mysqli_query($db, 'set names utf8');

    $no = $_GET['no'];

    $select_sql = "SELECT * FROM mbca_board WHERE no='$no'";

    $select_result = mysqli_query($db, $select_sql);

    $row = mysqli_fetch_array($select_result);

    if(!$row){
        echo "
            <script>
                alert('존재하지 않는 게시글입니다.');
                location.href='../board/board.php';
            </script>
        ";
        exit;
    }

    if($_SESSION['user_no'] != $row['user_no']){
        echo "
            <script>
                alert('삭제 권한이 없습니다.');
                location.href='../board/board.php';
            </script>
        ";
        exit;
    }

    $delete_sql = "DELETE FROM mbca_board WHERE no='$no'";

    $delete_result = mysqli_query($db, $delete_sql);

    if($delete_result){
        echo "
            <script>
                alert('삭제되었습니다.');
                location.href='../board/board.php';
            </script>
        ";
    }else{
        echo "
            <script>
                alert('삭제 실패');
                history.back();
            </script>
        ";
    }

?>