<?php

include "db.php";

$id = $_POST["id"];

$sql =
"DELETE FROM fitlog_exercises
WHERE id = ?";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "i",
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