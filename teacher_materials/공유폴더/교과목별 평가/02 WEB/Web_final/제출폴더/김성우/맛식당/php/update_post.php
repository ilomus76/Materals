<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_no = $_SESSION['user_no'] ?? '';
$user_id = $_SESSION['user_id'] ?? '';

if($user_id == '' || $user_no == ''){
    echo "<script>
        alert('로그인이 필요합니다');
        location.href='../html/0_login.html';
    </script>";
    exit;
}

$no = $_POST['no'] ?? '';
$old_food_img = $_POST['old_food_img'] ?? '';
$food_name = $_POST['food_name'] ?? '';
$restaurant_name = $_POST['restaurant_name'] ?? '';
$review = $_POST['review'] ?? '';
$lat = $_POST['lat'] ?? '';
$lng = $_POST['lng'] ?? '';
$address = $_POST['address'] ?? '';

if($no == '' || $food_name == '' || $restaurant_name == '' || $review == ''){
    echo "<script>
        alert('필수 입력값이 부족합니다');
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

$check_sql = "SELECT user_no FROM project_posts WHERE no = ?";
$check_stmt = mysqli_prepare($db, $check_sql);
mysqli_stmt_bind_param($check_stmt, "i", $no);
mysqli_stmt_execute($check_stmt);

$check_result = mysqli_stmt_get_result($check_stmt);
$post = mysqli_fetch_array($check_result, MYSQLI_ASSOC);

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

$food_img = $old_food_img;

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

        if($old_food_img != '' && file_exists($old_food_img)){
            unlink($old_food_img);
        }
    }
}

$sql = "UPDATE project_posts
        SET food_name = ?,
            restaurant_name = ?,
            review = ?,
            food_img = ?,
            lat = ?,
            lng = ?,
            address = ?
        WHERE no = ?";

$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param(
    $stmt,
    "sssssssi",
    $food_name,
    $restaurant_name,
    $review,
    $food_img,
    $lat,
    $lng,
    $address,
    $no
);

$result = mysqli_stmt_execute($stmt);

mysqli_close($db);

if($result){
    echo "<script>
        alert('수정되었습니다');
        location.href='./2_1_content.php?no=$no';
    </script>";
}else{
    echo "<script>
        alert('수정 실패');
        history.back();
    </script>";
}
?>