<?php

include "db.php";

$exerciseName = $_POST["exercise_name"];
$exerciseTime = $_POST["exercise_time"];
$userName = $_POST["user_name"];

$sql =
"INSERT INTO fitlog_exercises
(exercise_name, exercise_time, user_name)
VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sis",
    $exerciseName,
    $exerciseTime,
    $userName
);

$result = $stmt->execute();

echo json_encode([
    "success" => $result
]);

$stmt->close();
$conn->close();

?>