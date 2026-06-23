<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$comment_no = $_GET['comment_no'] ?? '';
$post_no = $_GET['post_no'] ?? '';

if($user_no == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($comment_no == '' || $post_no == ''){
    echo "<script>
        alert('잘못된 접근입니다');
        history.back();
    </script>";
    exit;
}

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');

if(!$db){
    echo "<script>
        alert('DB 연결 실패');
        history.back();
    </script>";
    exit;
}

mysqli_query($db, "set names utf8");

$check_sql = "SELECT user_no FROM project_comments WHERE no = ?";
$check_stmt = mysqli_prepare($db, $check_sql);
mysqli_stmt_bind_param($check_stmt, "i", $comment_no);
mysqli_stmt_execute($check_stmt);

$check_result = mysqli_stmt_get_result($check_stmt);
$comment = mysqli_fetch_array($check_result, MYSQLI_ASSOC);

if(!$comment){
    mysqli_close($db);
    echo "<script>
        alert('존재하지 않는 댓글입니다');
        location.href='./2_1_content.php?no=$post_no';
    </script>";
    exit;
}

if($comment['user_no'] != $user_no){
    mysqli_close($db);
    echo "<script>
        alert('본인이 작성한 댓글만 삭제할 수 있습니다');
        location.href='./2_1_content.php?no=$post_no';
    </script>";
    exit;
}

$delete_sql = "DELETE FROM project_comments WHERE no = ?";
$delete_stmt = mysqli_prepare($db, $delete_sql);
mysqli_stmt_bind_param($delete_stmt, "i", $comment_no);
$result = mysqli_stmt_execute($delete_stmt);

mysqli_close($db);

if($result){
    echo "<script>
        location.href='./2_1_content.php?no=$post_no';
    </script>";
}else{
    echo "<script>
        alert('댓글 삭제 실패');
        history.back();
    </script>";
}
?>