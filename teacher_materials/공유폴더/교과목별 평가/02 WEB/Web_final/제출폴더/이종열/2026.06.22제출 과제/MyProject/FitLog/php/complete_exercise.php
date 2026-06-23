<?php

include "db.php";

$id = $_POST["id"];

$sql =
"UPDATE fitlog_exercises
SET status='done'
WHERE id=?";

$stmt =
$conn->prepare($sql);

$stmt->bind_param("i",$id);

$result =
$stmt->execute();

echo json_encode([
    "success"=>$result
]);

?>