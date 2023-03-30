<?php

include "Database.php";

$mail = $_GET["mail"];
$pass = $_GET["pass"];

$db = Database::getInstance();

$data = array("result" => 0);

echo json_encode($data);

exit();