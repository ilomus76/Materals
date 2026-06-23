<?php
session_start();

$user_id = $_SESSION['user_id'] ?? '';
$profile_img = $_SESSION['profile_img'] ?? '';

if($user_id == ''){
    echo"<script>
    alert('로그인이 필요합니다');
    location.href='../html/0_login.html';
    </script>";
    exit;
}

if($profile_img == ''){
    $profile_img = '../source/img/profile_default.png';
}

$lat = $_GET['lat'] ?? '';
$lng = $_GET['lng'] ?? '';
$address = $_GET['address'] ?? '';

?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!2_2</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/2_2_upload.css">
    <script
    src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8ca0785f755a41e7a594e16fbc7654f9&libraries=services">
    </script>
     <script src="../js/2_2_upload.js?v=1" defer></script>
</head>
<body>
    <div id="wrap">

        <header>
            <button id="back_btn" onclick="history.back()"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'" ><img src="<?= $profile_img ?>" alt="profile"></button>
        </header>

    <form action="./insert_post.php" method="post" enctype="multipart/form-data">

        <main>
            <div id="upload_img">
                <img id="profile_select" src="../source/img/profile_choose.png" alt="profile_choose">
                <input id="in1" name="food_img" type="file" accept="image/*">
            </div>

            <div id="upload_text">
                <p>음식명</p>
                <input type="text" name="food_name" placeholder="음식명을 입력하세요.">

                <p>식당명</p>
            </div>

            <div id="search_bar">
                <div id="search_input_box">
                    <input type="text" id="restaurant_name" name="restaurant_name" placeholder="식당명을 검색하세요" value="<?= htmlspecialchars($address) ?>">

                    <button id="search_btn" type="button">
                        검색
                    </button>
                </div>

                <ul id="search_result"></ul>
            </div>

            <?php if($address != ''){ ?>
                <div id="selected_location">
                    <strong>📍 선택한 위치</strong>
                    <p><?= $address ?></p>
                </div>
            <?php } ?>

            <div id="map"></div>

            <input type="hidden" id="lat" name="lat" value="<?= $lat ?>">
            <input type="hidden" id="lng" name="lng" value="<?= $lng ?>">
            <input type="hidden" id="address" name="address" value="<?= $address ?>">

            <div id="upload_comment">
                <p>한줄평</p>
                <textarea name="review" id="comment" maxlength="100"
                    placeholder="한줄평을 입력하세요(최대 100자)"></textarea>
            </div>

            <button id="upload_btn" type="submit">등록하기</button>
        </main>

    </form>


    </div>
    
</body>
</html>