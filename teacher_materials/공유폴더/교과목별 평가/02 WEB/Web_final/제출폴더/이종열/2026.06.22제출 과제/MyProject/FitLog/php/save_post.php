<?php

include "db.php";

$title = $_POST["title"];
$content = $_POST["content"];
$writer = $_POST["writer"];

$sql = "
INSERT INTO fitlog_posts
(title, content, writer)
VALUES
(?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $title,
    $content,
    $writer
);

$result = $stmt->execute();

if($result){
    echo "success";
}else{
    echo "fail";
}

$stmt->close();
$conn->close();

?>