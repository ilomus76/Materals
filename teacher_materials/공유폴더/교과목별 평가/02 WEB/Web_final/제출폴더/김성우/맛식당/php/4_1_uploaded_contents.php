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

$user_no = $_SESSION['user_no'] ?? '';

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');

if(!$db){
    echo "<script>
        alert('DB 연결 실패');
        history.back();
    </script>";
    exit;
}

mysqli_query($db, "set names utf8");

$keyword = $_GET['keyword'] ?? '';

if($keyword != ''){
    $search_word = '%' . $keyword . '%';

    $sql = "SELECT *
            FROM project_posts
            WHERE user_no = ?
              AND (
                    food_name LIKE ?
                 OR restaurant_name LIKE ?
                 OR review LIKE ?
                 OR address LIKE ?
              )
            ORDER BY no DESC";

    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param(
        $stmt,
        "issss",
        $user_no,
        $search_word,
        $search_word,
        $search_word,
        $search_word
    );
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
}else{
    $sql = "SELECT *
            FROM project_posts
            WHERE user_no = ?
            ORDER BY no DESC";

    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt, "i", $user_no);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!4_1</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/4_1_uploaded_contents.css?v999">
    
</head>
<body>
    
<div id="wrap">

    <header>
        <button id="back_btn" onclick="history.back()"> ❮ </button>

        <img id="logo" src="../source/img/logo_b.png" alt="logo">

         <button id="profile_btn" onclick="location.href='./4_personal_info.php'" ><img src="<?= $profile_img ?>" alt="profile"></button>

    </header>

    <main>


    <div class="search_bar">

    <h1>내가 등록한 맛식당</h1>
    <form id="list_search" action="./4_1_uploaded_contents.php" method="get">
        <input 
            id="search_keyword"
            type="text" 
            name="keyword" 
            placeholder="음식명, 식당명, 지역으로 검색"
            value="<?= $keyword ?>"
            autocomplete="off"
        >
         <button type="submit">검색</button>

    </form>

        </div>

        <div id="contents_menu">
    <?php 
    $count = 0;
    while($post = mysqli_fetch_array($result, MYSQLI_ASSOC)){ 
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
    <?php if($keyword != ''){ ?>
        <p class="empty_text">검색 결과가 없습니다.</p>
    <?php }else{ ?>
        <p class="empty_text">아직 등록한 맛식당이 없습니다.</p>
    <?php } ?>
<?php } ?>

</div>

    </main>

    <div id="for_upload_btn">
        <button id="upload" onclick="location.href='./2_2_upload.php'"> 
                <span class="plus">+</span>
                <span class="upload-text">맛식당 등록</span> 
        </button>
    </div>
    

</div>
    
</body>
</html>