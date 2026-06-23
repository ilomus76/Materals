<?php
session_start();

$login_user_id = $_SESSION['user_id'] ?? '';
$login_profile_img = $_SESSION['profile_img'] ?? '';

if($login_user_id == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($login_profile_img == ''){
    $login_profile_img = '../source/img/profile_default.png';
}

$user_no = $_GET['user_no'] ?? '';

if($user_no == ''){
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

$user_sql = "SELECT * FROM project_users WHERE no = ?";
$user_stmt = mysqli_prepare($db, $user_sql);
mysqli_stmt_bind_param($user_stmt, "i", $user_no);
mysqli_stmt_execute($user_stmt);

$user_result = mysqli_stmt_get_result($user_stmt);
$user = mysqli_fetch_array($user_result, MYSQLI_ASSOC);

if(!$user){
    echo "<script>
        alert('존재하지 않는 회원입니다');
        history.back();
    </script>";
    exit;
}

if($user['profile_img'] == ''){
    $user['profile_img'] = '../source/img/profile_default.png';
}

$post_sql = "SELECT *
             FROM project_posts
             WHERE user_no = ?
             ORDER BY no DESC";

$post_stmt = mysqli_prepare($db, $post_sql);
mysqli_stmt_bind_param($post_stmt, "i", $user_no);
mysqli_stmt_execute($post_stmt);

$post_result = mysqli_stmt_get_result($post_stmt);
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title><?= $user['user_id'] ?>님의 프로필</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/4_3_user_profile.css">
</head>
<body>
    <div id="wrap">
        <header>
            <button id="back_btn" onclick="history.back()"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'">
                <img src="<?= $login_profile_img ?>" alt="profile">
            </button>
        </header>

        <main>
            <section id="user_profile">
                <img src="<?= $user['profile_img'] ?>" alt="user_profile">
                <h1><?= $user['user_id'] ?></h1>
                <p>등록한 맛식당</p>
            </section>

            <section id="contents_menu">
                <?php
                $count = 0;
                while($post = mysqli_fetch_array($post_result, MYSQLI_ASSOC)){
                    $count++;
                ?>
                    <div class="content" onclick="location.href='./2_1_content.php?no=<?= $post['no'] ?>'">
                        <img class="food" src="<?= $post['food_img'] ?>" alt="food">
                        <p><?= $post['food_name'] ?></p>

                        <div class="heart">
                            <img src="../source/img/heart.png" alt="heart">
                            <p><?= $post['likes'] ?></p>
                        </div>
                    </div>
                <?php } ?>

                <?php if($count == 0){ ?>
                    <p class="empty_text">아직 등록한 맛식당이 없습니다.</p>
                <?php } ?>
            </section>
        </main>
    </div>

    <?php mysqli_close($db); ?>
</body>
</html>