<?php
session_start();

$user_id = $_SESSION['user_id'] ?? '';
$profile_img = $_SESSION['profile_img'] ?? '';

if($user_id == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($profile_img == ''){
    $profile_img = '../source/img/profile_default.png';
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

$no = $_GET['no'] ?? '';
$selected_post = null;

if($no != ''){
    $sql = "SELECT no, food_name, restaurant_name, lat, lng, address 
            FROM project_posts 
            WHERE no = ?";

    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "i", $no);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
    $selected_post = mysqli_fetch_array($result, MYSQLI_ASSOC);
}

$all_sql = "SELECT no, food_name, restaurant_name, lat, lng, address 
            FROM project_posts 
            WHERE lat != '' AND lng != ''
            ORDER BY no DESC";

$all_result = mysqli_query($db, $all_sql);

$posts = [];

while($row = mysqli_fetch_array($all_result, MYSQLI_ASSOC)){
    $posts[] = $row;
}

mysqli_close($db);
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!3</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/3_map.css">
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8ca0785f755a41e7a594e16fbc7654f9&libraries=services"></script>

    <script>
        var selectedPost = <?= json_encode($selected_post, JSON_UNESCAPED_UNICODE) ?>;
        var allPosts = <?= json_encode($posts, JSON_UNESCAPED_UNICODE) ?>;
    </script>

    <script src="../js/3_map.js?v=<?= time() ?>" defer></script>

</head>
<body>
    <div id="wrap">
        <header>

        <form id="search_bar">
            <div class="search_input_box">
                <input id="keyword" type="text" placeholder="맛식당 이름 검색">
                <button type="submit">
                    <img src="../source/img/arrow.png" alt="search">
                </button>
            </div>

            <ul id="search_result"></ul>
        </form>

        </header>



        <main>
            <div id="map"></div>

            <button id="my_location_btn">
                내 위치
            </button>

            <button id="upload" onclick="location.href='./2_2_upload.php'"> 
                <span class="plus">+</span>
                <span class="upload-text">맛식당 등록</span> 
            </button>

        </main>


        <footer>
            <div id="tool_bar">
            <button id="back_btn" onclick="location.href='./1_main.php'"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'" ><img src="<?= $profile_img ?>" alt="profile"></button>

            </div>



        </footer>

    </div>
    
</body>
</html>