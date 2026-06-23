<?php

include "db.php";

$id = $_POST["id"];
$title = $_POST["title"];
$content = $_POST["content"];

$sql =
"UPDATE fitlog_posts
SET title = ?, content = ?
WHERE id = ?";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "ssi",
    $title,
    $content,
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