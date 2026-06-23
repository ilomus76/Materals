<?php

include('../db.php');

$no = $_GET['no'];

$update_sql = "UPDATE review_board
               SET hits = hits + 1
               WHERE no='$no'";

mysqli_query($db, $update_sql);

$sql = "SELECT * FROM review_board
        WHERE no='$no'";

$result = mysqli_query($db, $sql);

$row = mysqli_fetch_assoc($result);

echo json_encode($row);

?>