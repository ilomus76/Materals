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

    $no = $_POST['no'];
    $category = $_POST['category'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $old_img = $_POST['old_img'];

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
                alert('수정 권한이 없습니다.');
                location.href='../board/board.php';
            </script>
        ";
        exit;
    }

    if($_FILES['board_img']['name'] == ''){
        $board_img = $old_img;
    }
    else{
        $board_img = $_FILES['board_img']['name'];
        $tmp_name = $_FILES['board_img']['tmp_name'];

        move_uploaded_file(
            $tmp_name,
            "../uploads/board/".$board_img
        );
    }

    $update_sql = "UPDATE mbca_board SET category='$category', title='$title', content='$content', board_img='$board_img' WHERE no='$no'";

    $update_result = mysqli_query($db, $update_sql);

    if($update_result){
        echo "
            <script>
                alert('수정되었습니다.');
                location.href='../board/view.php?no=$no';
            </script>
        ";
    }else{
        echo "
            <script>
                alert('수정에 실패했습니다.');
                history.back();
            </script>
        ";
    }
?>