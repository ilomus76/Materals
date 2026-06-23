<?php
session_start();

$user_id = $_SESSION['user_id'] ?? '';
$profile_img = $_SESSION['profile_img'] ?? '';

if($user_id == ''){
    echo "<script>
        alert('로그인이 필요합니다.');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($profile_img == ''){
    $profile_img = '../source/img/profile_default.png';
}

$user_no = $_SESSION['user_no'] ?? '';

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');
mysqli_query($db, "set names utf8");

$count_sql = "SELECT COUNT(*) AS cnt FROM project_posts WHERE user_no = ?";
$count_stmt = mysqli_prepare($db, $count_sql);
mysqli_stmt_bind_param($count_stmt, "i", $user_no);
mysqli_stmt_execute($count_stmt);

$count_result = mysqli_stmt_get_result($count_stmt);
$count_row = mysqli_fetch_array($count_result, MYSQLI_ASSOC);
$my_post_count = $count_row['cnt'];

$like_count_sql = "SELECT COUNT(*) AS cnt 
                   FROM project_likes 
                   WHERE user_no = ?";

$like_count_stmt = mysqli_prepare($db, $like_count_sql);
mysqli_stmt_bind_param($like_count_stmt, "i", $user_no);
mysqli_stmt_execute($like_count_stmt);

$like_count_result = mysqli_stmt_get_result($like_count_stmt);
$like_count_row = mysqli_fetch_array($like_count_result, MYSQLI_ASSOC);
$my_like_count = $like_count_row['cnt'];
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!_4</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/4_personal_info.css">

</head>
<body>
    <div id="wrap">

         <header>
            <button id="back_btn" onclick="history.back()"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">
        </header>


        <main>
            <img src="<?= $profile_img ?>" alt="profile.img">
            <p><strong><?= $user_id ?></strong>님의 공간입니다!</p>
        
        </main>

        <nav>
            <div class="category" onclick="location.href='./4_1_uploaded_contents.php'">
                <img src="../source/img/spoon.png" alt="make_contents">
                <div class="text">
                    <strong>내가 등록한 맛식당</strong>
                    <p>[<?= $my_post_count ?>]개</p>
                </div>
                <button> ❯ </button>


            </div>

            <div class="category" onclick="location.href='./4_2_liked_contents.php'">
                <img src="../source/img/heart.png" alt="like_contents">
                <div class="text">
                    <strong>내가 좋아한 맛식당</strong>
                    <p>[<?= $my_like_count ?>]개</p>
                </div>
                <button> ❯ </button>

            </div>

            <a href="../html/0_login.html">로그아웃</a>
        </nav>





    </div>
    
</body>
</html>