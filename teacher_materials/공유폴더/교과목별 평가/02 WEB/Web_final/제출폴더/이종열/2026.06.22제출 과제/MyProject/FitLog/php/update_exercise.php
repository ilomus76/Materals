<?php

include "db.php";

$id = $_POST["id"];
$exerciseName = $_POST["exercise_name"];
$exerciseTime = $_POST["exercise_time"];

$sql =
"UPDATE fitlog_exercises
SET exercise_name = ?,
    exercise_time = ?
WHERE id = ?";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "sii",
    $exerciseName,
    $exerciseTime,
    $id
);

$result =
$stmt->execute();

echo json_encode([
    "success" => $result
]);

$stmt->close();
$conn->close();

?>