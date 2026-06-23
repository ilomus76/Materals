<?php
    
    session_start();

    header('Content-Type:text/html; charset=utf-8');

    session_destroy();

    header("Location:../index.html");

?>