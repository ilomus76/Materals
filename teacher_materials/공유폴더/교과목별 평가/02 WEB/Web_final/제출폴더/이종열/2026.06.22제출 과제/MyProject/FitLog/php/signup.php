<?php

include "db.php";

$name = $_POST["name"];
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

// 이메일 중복 검사
$stmt =
$conn->prepare(
"SELECT id
FROM users
WHERE email=?"
);

$stmt->bind_param(
"s",
$email
);

$stmt->execute();

$result =
$stmt->get_result();

if($result->num_rows > 0){
    echo "duplicate";
    exit;
}

// 프로필 이미지 저장
$profileImage = "";

if(
isset($_FILES["profile_image"])
&&
$_FILES["profile_image"]["error"] == 0
){

    $fileName =
    time() . "_" .
    basename(
        $_FILES["profile_image"]["name"]
    );

    move_uploaded_file(
        $_FILES["profile_image"]["tmp_name"],
        "../uploads/" . $fileName
    );

    $profileImage = $fileName;
}

// 회원가입 저장
$sql =
"INSERT INTO users(name,email,password,profile_image)
VALUES('$name','$email','$password','$profileImage')";

$result =
mysqli_query($conn, $sql);

if($result){
    echo "success";
}else{
    echo "fail";
}