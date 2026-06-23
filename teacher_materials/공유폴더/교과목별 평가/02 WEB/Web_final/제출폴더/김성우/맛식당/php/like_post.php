<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';
$post_no = $_GET['no'] ?? '';

if($user_id == '' || $user_no == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($post_no == ''){
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

// 이미 좋아요를 눌렀는지 확인
$check_sql = "SELECT no FROM project_likes WHERE post_no = ? AND user_no = ?";
$check_stmt = mysqli_prepare($db, $check_sql);
mysqli_stmt_bind_param($check_stmt, "ii", $post_no, $user_no);
mysqli_stmt_execute($check_stmt);

$check_result = mysqli_stmt_get_result($check_stmt);
$like = mysqli_fetch_array($check_result, MYSQLI_ASSOC);

if($like){
    mysqli_close($db);
    echo "<script>
        alert('이미 좋아요를 눌렀습니다');
        location.replace('./2_1_content.php?no=$post_no');
    </script>";
    exit;
}

// 좋아요 기록 저장
$insert_sql = "INSERT INTO project_likes (post_no, user_no) VALUES (?, ?)";
$insert_stmt = mysqli_prepare($db, $insert_sql);
mysqli_stmt_bind_param($insert_stmt, "ii", $post_no, $user_no);
$insert_result = mysqli_stmt_execute($insert_stmt);

if($insert_result){
    // 게시글 likes 증가
    $update_sql = "UPDATE project_posts SET likes = likes + 1 WHERE no = ?";
    $update_stmt = mysqli_prepare($db, $update_sql);
    mysqli_stmt_bind_param($update_stmt, "i", $post_no);
    mysqli_stmt_execute($update_stmt);

    mysqli_close($db);

    echo "<script>
        location.replace('./2_1_content.php?no=$post_no');
    </script>";
}else{
    mysqli_close($db);

    echo "<script>
        alert('좋아요 실패');
        history.back();
    </script>";
}
?>