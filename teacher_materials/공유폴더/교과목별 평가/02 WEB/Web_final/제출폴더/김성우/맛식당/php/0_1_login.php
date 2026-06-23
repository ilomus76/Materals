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
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!0_1</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/0_1_login.css">
</head>
<body>
    <div id="wrap">

        <header>
            <img src="../source/img/logo_b.png" alt="logo_b">
        </header>

        <main>
            <img src="<?= $profile_img ?>" alt="profile_default">

            <h1>반가워요, <?= $user_id ?> 님!</h1>

            <div class="join">
                <button onclick="location.href='./1_main.php'">JOIN</button>
                <button onclick="location.href='./logout.php'">로그아웃</button>
            </div>
        </main>

    </div>
</body>
</html>