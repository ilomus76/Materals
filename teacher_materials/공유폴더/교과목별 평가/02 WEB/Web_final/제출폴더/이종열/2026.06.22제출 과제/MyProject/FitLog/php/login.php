<?php

include "db.php";

$email = trim($_POST["email"]);
$password = trim($_POST["password"]);

// 이메일 조회
$stmt =
$conn->prepare(
"SELECT *
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

    $user =
    $result->fetch_assoc();

    if(
        password_verify(
            $password,
            $user["password"]
        )
    ){

        echo json_encode([
            "success" => true,
            "name" => $user["name"],
            "email" => $user["email"],
            "profile_image" =>
            $user["profile_image"]
        ]);

    }else{

        echo json_encode([
            "success" => false
        ]);
    }

}else{

    echo json_encode([
        "success" => false
    ]);
}