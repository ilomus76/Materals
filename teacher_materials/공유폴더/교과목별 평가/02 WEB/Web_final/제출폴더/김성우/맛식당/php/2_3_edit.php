<?php
session_start();

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';
$profile_img = $_SESSION['profile_img'] ?? '';

if($user_id == '' || $user_no == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

if($profile_img == ''){
    $profile_img = '../source/img/profile_default.png';
}

$no = $_GET['no'] ?? '';

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

$sql = "SELECT * FROM project_posts WHERE no = ?";
$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param($stmt, "i", $no);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$post = mysqli_fetch_array($result, MYSQLI_ASSOC);

if(!$post){
    echo "<script>
        alert('존재하지 않는 게시글입니다');
        history.back();
    </script>";
    exit;
}

if($post['user_no'] != $user_no){
    echo "<script>
        alert('본인이 작성한 글만 수정할 수 있습니다');
        history.back();
    </script>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!2_3</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/2_3_edit.css">
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=8ca0785f755a41e7a594e16fbc7654f9&libraries=services"></script>
    <script src="../js/2_2_upload.js?v=2" defer></script>
</head>
<body>
    <div id="wrap">

        <header>
            <button id="back_btn" onclick="history.back()"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'">
                <img src="<?= $profile_img ?>" alt="profile">
            </button>
        </header>

        <form action="./update_post.php" method="post" enctype="multipart/form-data">
            <main>
                <input type="hidden" name="no" value="<?= $post['no'] ?>">
                <input type="hidden" name="old_food_img" value="<?= $post['food_img'] ?>">

                <div id="upload_img">
                    <img id="profile_select" src="<?= $post['food_img'] ?>" alt="food_img">
                    <input id="in1" name="food_img" type="file" accept="image/*">
                </div>

                <div id="upload_text">
                    <p>음식명</p>
                    <input type="text" name="food_name" placeholder="음식명을 입력하세요." value="<?= $post['food_name'] ?>">

                    <p>식당명</p>
                </div>

                <div id="search_bar">
                    <div id="search_input_box">
                        <input type="text" id="restaurant_name" name="restaurant_name" placeholder="식당명을 검색하세요" value="<?= $post['restaurant_name'] ?>">

                        <button id="search_btn" type="button">
                            검색
                        </button>
                    </div>

                    <ul id="search_result"></ul>
                </div>

                <div id="map"></div>

                <input type="hidden" id="lat" name="lat" value="<?= $post['lat'] ?>">
                <input type="hidden" id="lng" name="lng" value="<?= $post['lng'] ?>">
                <input type="hidden" id="address" name="address" value="<?= $post['address'] ?>">

                <div id="upload_comment">
                    <p>한줄평</p>
                    <textarea name="review" id="comment" maxlength="100" placeholder="한줄평을 입력하세요(최대 100자)"><?= $post['review'] ?></textarea>
                </div>

                <button id="upload_btn" type="submit">수정하기</button>
                <button id="delete_btn" type="button" onclick="deletePost()">삭제하기</button>
            </main>
        </form>
    </div>

    <script>
        function deletePost(){
            if(confirm('정말 삭제하시겠습니까?')){
                location.href = './delete_post.php?no=<?= $post['no'] ?>';
            }
        }
    </script>
</body>
</html>

<?php mysqli_close($db); ?>