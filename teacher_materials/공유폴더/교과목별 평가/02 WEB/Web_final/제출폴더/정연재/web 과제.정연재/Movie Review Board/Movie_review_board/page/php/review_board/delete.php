<?php

session_start();

include('../db.php');

$no = $_POST['no'];

$sql = "DELETE FROM review_board
        WHERE no='$no'";

$result = mysqli_query($db, $sql);

if($result){

    echo "success";

}else{

    echo "fail";

}

?>