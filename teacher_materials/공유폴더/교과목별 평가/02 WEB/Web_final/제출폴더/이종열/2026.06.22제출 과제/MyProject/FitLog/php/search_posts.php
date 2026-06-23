<?php

include "db.php";

$keyword = $_GET["keyword"];

$sql =
"SELECT *
FROM fitlog_posts
WHERE title LIKE ?
OR content LIKE ?
ORDER BY id DESC";

$stmt = $conn->prepare($sql);

$searchKeyword = "%" . $keyword . "%";

$stmt->bind_param(
    "ss",
    $searchKeyword,
    $searchKeyword
);

$stmt->execute();

$result = $stmt->get_result();

$posts = [];

while($row = $result->fetch_assoc()){
    $posts[] = $row;
}

echo json_encode($posts);

$stmt->close();
$conn->close();

?>