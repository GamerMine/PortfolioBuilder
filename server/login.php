<?php

include "Database.php";
include "Utils.php";


session_start();

if (isset($_GET["session"])) {
    if (isset($_SESSION["mail"])) {
        $data = array("connected" => true, "connectedUser" => $_SESSION["mail"]);
    } else {
        $data = array("connected" => false);
    }
} else {
    $mail = $_GET["mail"];
    $pass = $_GET["pass"];

    $mail = prepareData($mail);
    $pass = prepareData($pass);

    $db = Database::getInstance();
    $result = false;

    if ($db->checkUserExistence($mail)) {
        if (password_verify($pass, $db->getPassword($mail))) {
            $result = true;
            $_SESSION["mail"] = $mail;
        }
    }

    $data = array("authenticate" => $result);

    $db->close();
}
echo json_encode($data);

exit();