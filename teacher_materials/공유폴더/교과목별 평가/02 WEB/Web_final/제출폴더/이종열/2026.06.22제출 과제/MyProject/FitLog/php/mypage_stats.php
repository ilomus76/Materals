<?php

include "db.php";

$user_name =
$_GET["user_name"];

$response = [];


// 게시글 수

$sql =
"SELECT COUNT(*) AS board_count
FROM fitlog_posts
WHERE writer = ?";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "s",
    $user_name
);

$stmt->execute();

$result =
$stmt->get_result();

$response["board_count"] =
$result->fetch_assoc()["board_count"];

$stmt->close();


// 진행중 운동

$sql =
"SELECT
COUNT(*) AS exercise_count,
IFNULL(SUM(exercise_time),0)
AS exercise_time
FROM fitlog_exercises
WHERE user_name = ?
AND status = 'active'";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "s",
    $user_name
);

$stmt->execute();

$result =
$stmt->get_result();

$row =
$result->fetch_assoc();

$response["exercise_count"] =
$row["exercise_count"];

$response["exercise_time"] =
$row["exercise_time"];

$stmt->close();


// 완료 운동

$sql =
"SELECT
COUNT(*) AS completed_count,
IFNULL(SUM(exercise_time),0)
AS completed_time
FROM fitlog_exercises
WHERE user_name = ?
AND status = 'done'";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "s",
    $user_name
);

$stmt->execute();

$result =
$stmt->get_result();

$row =
$result->fetch_assoc();

$response["completed_count"] =
$row["completed_count"];

$response["completed_time"] =
$row["completed_time"];

$stmt->close();


// 완료율

$total =
$response["exercise_count"]
+
$response["completed_count"];

if($total == 0){

    $response["completion_rate"] = 0;

}else{

    $response["completion_rate"] =
    round(
        $response["completed_count"]
        /
        $total
        *
        100
    );
}

echo json_encode(
    $response
);

$conn->close();

?>