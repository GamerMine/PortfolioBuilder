<?php

include "Database.php";
include "utils.php";

$mail = $_GET["mail"];
$pass = $_GET["pass"];
$verifPass = $_GET["verifPass"];

$mail = prepareData($mail);
$pass = prepareData($pass);
$verifPass = prepareData($verifPass);

$db = Database::getInstance();
$result = false;

if (isset($_SESSION["mail"])) {
    $result = true;
}

if (!($db->checkUserExistence($mail))) {
    if($pass == $verifPass) {
        $db->addAccount($mail,password_hash($pass, PASSWORD_DEFAULT));
        $result = true;
        session_start();
        $_SESSION["mail"] = $mail;
    }
    else
    {
        //TODO : Mot de passe pas bon
    }
}

$data = array("authenticate" => $result);

$db->close();

echo json_encode($data);

exit();