<?php

include "db.php";

$sql =
"SELECT * FROM fitlog_posts
ORDER BY id DESC";

$result =
$conn->query($sql);

$posts = [];

while($row = $result->fetch_assoc()){
    $posts[] = $row;
}

echo json_encode($posts);

$conn->close();

?>