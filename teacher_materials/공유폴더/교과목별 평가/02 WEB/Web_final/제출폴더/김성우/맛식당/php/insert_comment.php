<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';

$post_no = $_POST['post_no'] ?? '';
$comment = $_POST['comment'] ?? '';

if($user_no == '' || $user_id == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($post_no == '' || $comment == ''){
    echo "<script>
        alert('댓글 내용을 입력해주세요');
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

$sql = "INSERT INTO project_comments
        (post_no, user_no, user_id, comment)
        VALUES
        (?, ?, ?, ?)";

$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param(
    $stmt,
    "iiss",
    $post_no,
    $user_no,
    $user_id,
    $comment
);

$result = mysqli_stmt_execute($stmt);

mysqli_close($db);

if($result){
    echo "<script>
        location.href='./2_1_content.php?no=$post_no';
    </script>";
}else{
    echo "<script>
        alert('댓글 등록 실패');
        history.back();
    </script>";
}
?>