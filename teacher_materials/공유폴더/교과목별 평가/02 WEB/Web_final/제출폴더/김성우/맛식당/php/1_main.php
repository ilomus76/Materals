<?php
session_start();

$user_id = $_SESSION['user_id'] ?? '';
$profile_img = $_SESSION['profile_img'] ?? '';
$user_no = $_SESSION['user_no'] ?? 0;

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

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');

if(!$db){
    echo "<script>
        alert('DB 연결 실패');
        history.back();
    </script>";
    exit;
}

mysqli_query($db, "set names utf8");

$top_sql = "
    SELECT 
        p.*,
        (
            SELECT COUNT(*)
            FROM project_likes pl
            WHERE pl.post_no = p.no
            AND pl.user_no = $user_no
        ) AS liked
    FROM project_posts p
    ORDER BY p.likes DESC, p.views DESC
    LIMIT 3
";
$top_result = mysqli_query($db, $top_sql);

$recent_sql = "
    SELECT 
        p.*,
        (
            SELECT COUNT(*)
            FROM project_likes pl
            WHERE pl.post_no = p.no
            AND pl.user_no = $user_no
        ) AS liked
    FROM project_posts p
    ORDER BY p.no DESC
    LIMIT 8
";
$recent_result = mysqli_query($db, $recent_sql);

$weather_temp = '';
$weather_desc = '';
$weather_food = '';
$weather_msg = '';

$api_key = '18acc242812e320ee4a52cbace67cba15883efb8c6aec33a03dbcad972ea6cda';

$date = date('Ymd');

// 초단기실황은 보통 현재 시각보다 40분 전 기준이 안전함
$hour = date('H', strtotime('-1 hour'));
$base_time = $hour . '00';

// 서울 중구 근처 격자값 예시
$nx = 60;
$ny = 127;

$weather_url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"
    . "?serviceKey=" . $api_key
    . "&pageNo=1"
    . "&numOfRows=100"
    . "&dataType=JSON"
    . "&base_date=" . $date
    . "&base_time=" . $base_time
    . "&nx=" . $nx
    . "&ny=" . $ny;

    $cache_dir = "../cache";
    $cache_file = "../cache/weather.json";
    $cache_time = 1800; // 30분

    if(!is_dir($cache_dir)){
        mkdir($cache_dir, 0777, true);
    }

    if(file_exists($cache_file) && time() - filemtime($cache_file) < $cache_time){
        $weather_json = file_get_contents($cache_file);
    }else{
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $weather_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $weather_json = curl_exec($ch);

        curl_close($ch);

        if($weather_json){
            file_put_contents($cache_file, $weather_json);
        }
    }

if($weather_json){
    $weather_data = json_decode($weather_json, true);

    $items = $weather_data['response']['body']['items']['item'] ?? [];

    $temp = '';
    $pty = '';

    foreach($items as $item){
        if($item['category'] == 'T1H'){
            $temp = $item['obsrValue'];
        }

        if($item['category'] == 'PTY'){
            $pty = $item['obsrValue'];
        }
    }

    $weather_temp = round($temp);

    if($pty == '1' || $pty == '4'){
        $weather_desc = '비';
        $weather_food = '김치찌개';
        $weather_msg = '비 오는 날엔 뜨끈한 국물 맛식당 어때요?';
    }else if($pty == '2'){
        $weather_desc = '비/눈';
        $weather_food = '우동';
        $weather_msg = '궂은 날씨엔 따뜻한 면 요리가 잘 어울려요.';
    }else if($pty == '3'){
        $weather_desc = '눈';
        $weather_food = '국밥';
        $weather_msg = '눈 오는 날엔 든든한 국물 맛식당을 추천해요.';
    }else if($weather_temp >= 28){
        $weather_desc = '더움';
        $weather_food = '냉면';
        $weather_msg = '더운 날엔 시원한 맛식당이 딱이에요.';
    }else if($weather_temp <= 5){
        $weather_desc = '추움';
        $weather_food = '국밥';
        $weather_msg = '추운 날엔 따뜻하고 든든한 한 끼가 좋아요.';
    }else{
        $weather_desc = '맑음/흐림';
        $weather_food = '제육볶음';
        $weather_msg = '오늘 같은 날엔 든든한 한 끼가 좋아요.';
    }
}else{
    $weather_temp = '-';
    $weather_desc = '날씨 정보를 불러올 수 없습니다';
    $weather_food = '맛식당';
    $weather_msg = '오늘도 맛있는 한 끼를 찾아보세요.';
}

?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!_1</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/1_main.css">
    <!-- <script src="../js/1_main.js" defer></script> -->
</head>
<body>

    <div id="wrap">

        <header>
            <button id="back_btn" onclick="location.href='./0_1_login.php'"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'" ><img src="<?= $profile_img ?>" alt="profile"></button>
            <!-- 프로필 누르면 개인정보 화면으로 이동 -->
        </header>

        <main>
            <div id="top3">
                <div id= "top_info">
                    <img src="../source/img/crown.png" alt="crown">
                    <h2>TOP 3 맛식당!</h2>
                </div>
                <div id="top_food">
                    <?php 
                    $rank = 1;
                    while($top = mysqli_fetch_array($top_result, MYSQLI_ASSOC)){ 
                    ?>
                        <div class="top" onclick="location.href='./2_1_content.php?no=<?= $top['no'] ?>'">
                            <span class="rank rank<?= $rank ?>"><?= $rank ?></span>

                            <img class="food" src="<?= $top['food_img'] ?>" alt="food">

                            <p><?= $top['food_name'] ?></p>

                            <div class="heart">
                                <img src="../source/img/<?= $top['liked'] ? 'heart.png' : 'heart_none.png' ?>" alt="heart">
                                <p><?= $top['likes'] ?></p>
                            </div>
                        </div>
                    <?php 
                        $rank++;
                    } 
                    ?>
                </div>

            </div>


            <div id="contents">
                <div id="contents_top">
                    <img src="../source/img/spoon.png" alt="spoon">
                    <h2>최근 여기 진짜 맛식당!</h2>
                </div>

                <div id="contents_menu">
                    <?php while($post = mysqli_fetch_array($recent_result, MYSQLI_ASSOC)){ ?>
                        <div class="content" onclick="location.href='./2_1_content.php?no=<?= $post['no'] ?>'">
                            <img class="food" src="<?= $post['food_img'] ?>" alt="food">

                            <p><?= $post['food_name'] ?></p>

                            <div class="heart">
                                <img src="../source/img/<?= $post['liked'] ? 'heart.png' : 'heart_none.png' ?>" alt="heart">
                                <p><?= $post['likes'] ?></p>
                            </div>
                        </div>
                    <?php } ?>
                </div>

            </div>

            <div id="weather_recommend">
                <div id="weather_left">
                    <h2><?= $weather_temp ?>°C</h2>
                    <p><?= $weather_desc ?></p>
                </div>

                <div id="weather_right">
                    <h2>오늘은 <?= $weather_food ?> 어때요?</h2>
                    <p><?= $weather_msg ?></p>

                    <button 
                        id="weather_search_btn"
                        onclick="location.href='./2_contents_list.php?keyword=<?= urlencode($weather_food) ?>'">
                        추천 맛식당 찾기
                    </button>
                </div>
            </div>

        </main>

        <nav>
            <button onclick="location.href='./2_contents_list.php'">맛식당 리스트</button>
            <button onclick="location.href='./3_map.php'">맛식당 지도</button>
            <button id="upload" onclick="location.href='./2_2_upload.php'"> 
                <span class="plus">+</span>
                <span class="upload-text">맛식당 등록</span> 
            </button>
        </nav>
    </div>

    <footer>
        

    
    </footer>
    
    <?php mysqli_close($db); ?>
</body>
</html>