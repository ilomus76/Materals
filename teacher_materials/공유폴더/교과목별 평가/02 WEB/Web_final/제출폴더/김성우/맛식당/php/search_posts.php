<?php
header("Content-Type: application/json; charset=utf-8");

$keyword = $_GET['keyword'] ?? '';

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');
mysqli_query($db, "set names utf8");

if($keyword == ''){
    echo json_encode([]);
    exit;
}

$search_word = '%' . $keyword . '%';

$sql = "SELECT no, food_name, restaurant_name
        FROM project_posts
        WHERE food_name LIKE ?
           OR restaurant_name LIKE ?
           OR address LIKE ?
        ORDER BY no DESC
        LIMIT 10";

$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param($stmt, "sss", $search_word, $search_word, $search_word);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$list = [];

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $list[] = $row;
}

echo json_encode($list, JSON_UNESCAPED_UNICODE);

mysqli_close($db);
?>