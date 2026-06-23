<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';
$no = $_GET['no'] ?? '';

if($user_id == '' || $user_no == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($no == ''){
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

$check_sql = "SELECT user_no, food_img FROM project_posts WHERE no = ?";
$check_stmt = mysqli_prepare($db, $check_sql);
mysqli_stmt_bind_param($check_stmt, "i", $no);
mysqli_stmt_execute($check_stmt);

$check_result = mysqli_stmt_get_result($check_stmt);
$post = mysqli_fetch_array($check_result, MYSQLI_ASSOC);

if(!$post){
    echo "<script>
        alert('존재하지 않는 게시글입니다');
        location.href='./2_contents_list.php';
    </script>";
    exit;
}

if($post['user_no'] != $user_no){
    echo "<script>
        alert('본인이 작성한 글만 삭제할 수 있습니다');
        history.back();
    </script>";
    exit;
}

$delete_like_sql = "DELETE FROM project_likes WHERE post_no = ?";
$delete_like_stmt = mysqli_prepare($db, $delete_like_sql);
mysqli_stmt_bind_param($delete_like_stmt, "i", $no);
mysqli_stmt_execute($delete_like_stmt);

$delete_sql = "DELETE FROM project_posts WHERE no = ?";
$delete_stmt = mysqli_prepare($db, $delete_sql);
mysqli_stmt_bind_param($delete_stmt, "i", $no);
$result = mysqli_stmt_execute($delete_stmt);

if($result){
    if($post['food_img'] != '' && file_exists($post['food_img'])){
        unlink($post['food_img']);
    }

    mysqli_close($db);

    echo "<script>
        alert('삭제되었습니다');
        location.href='./2_contents_list.php';
    </script>";
}else{
    mysqli_close($db);

    echo "<script>
        alert('삭제 실패');
        history.back();
    </script>";
}
?>