<?php

include "Database.php";
include "Utils.php";

$mail = $_GET["mail"];
$pass = $_GET["pass"];

$mail = prepareData($mail);
$pass = prepareData($pass);

$db = Database::getInstance();
$result = false;

if (isset($_SESSION["mail"])) {
    $result = true;
}

if ($db->checkUserExistence($mail)) {
    if(password_verify($pass, $db->getPassword($mail))) {
        $result = true;
        session_start();
        $_SESSION["mail"] = $mail;
    }
}

$data = array("authenticate" => $result);

$db->close();

echo json_encode($data);

exit();