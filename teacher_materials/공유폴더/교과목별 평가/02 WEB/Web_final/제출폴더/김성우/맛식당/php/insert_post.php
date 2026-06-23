<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';

if($user_id == ''){
    echo "<script>
        alert('로그인이 필요합니다.');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

$food_name = $_POST['food_name'] ?? '';
$restaurant_name = $_POST['restaurant_name'] ?? '';
$review = $_POST['review'] ?? '';
$lat = $_POST['lat'] ?? '';
$lng = $_POST['lng'] ?? '';
$address = $_POST['address'] ?? '';

if($food_name == '' || $restaurant_name == '' || $review == ''){
    echo "<script>
        alert('음식명, 식당명, 한줄평을 모두 입력해주세요.');
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

$food_img = '';

if(isset($_FILES['food_img']) && $_FILES['food_img']['error'] == 0){

    $upload_dir = "../uploads/food/";

    if(!is_dir($upload_dir)){
        mkdir($upload_dir, 0777, true);
    }

    $origin_name = $_FILES['food_img']['name'];
    $tmp_name = $_FILES['food_img']['tmp_name'];

    $ext = pathinfo($origin_name, PATHINFO_EXTENSION);
    $new_name = time() . "_" . rand(1000, 9999) . "." . $ext;

    $save_path = $upload_dir . $new_name;

    if(move_uploaded_file($tmp_name, $save_path)){
        $food_img = $save_path;
    }
}

if($food_img == ''){
    echo "<script>
        alert('음식 사진을 선택해주세요.');
        history.back();
    </script>";
    exit;
}

$sql = "INSERT INTO project_posts
        (user_no, user_id, food_name, restaurant_name, review, food_img, lat, lng, address)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($db, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "issssssss",
    $user_no,
    $user_id,
    $food_name,
    $restaurant_name,
    $review,
    $food_img,
    $lat,
    $lng,
    $address
);

$result = mysqli_stmt_execute($stmt);

if($result){
    echo "<script>
        alert('맛식당이 등록되었습니다.');
        location.href='./2_contents_list.php';
    </script>";
}else{
    echo "<script>
        alert('등록 실패');
        history.back();
    </script>";
}

mysqli_close($db);
?>