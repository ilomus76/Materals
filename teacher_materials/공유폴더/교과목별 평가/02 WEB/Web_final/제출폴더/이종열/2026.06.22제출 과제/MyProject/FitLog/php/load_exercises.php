<?php

include "db.php";

$user_name =
$_GET["user_name"];

$sql =
"SELECT *
FROM fitlog_exercises
WHERE user_name = ?
AND status != 'done'
ORDER BY id DESC";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "s",
    $user_name
);

$stmt->execute();

$result =
$stmt->get_result();

$exercises = [];

while($row = $result->fetch_assoc()){

    $exercises[] = $row;
}

echo json_encode($exercises);

$stmt->close();
$conn->close();

?>