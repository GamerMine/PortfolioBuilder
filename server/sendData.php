<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "Database.php";
include "utils.php";

$sentCommand = $_GET["command"];
$db = Database::getInstance();
$data = array("connected" => false);

session_start();

switch ($sentCommand) {
    case "SET_LOCATION": {
        $_SESSION["location"] = $_GET["location"];
        break;
    }
    case "SEND_INFO": {
        if (!isset($_SESSION["mail"])) {
            $data = array("connected" => false);
            break;
        }

        $data = array("connected" => true);
        $db->setUserInfo($_GET["title"], $_GET["name"], $_GET["surname"], $_SESSION["mail"]);
        break;
    }
    case "SAVE_FILE":{
        $filename = generateUUID(openssl_random_pseudo_bytes(16));
        $file = move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$filename);
        $data = array("connected" => true, "link" => "upload/".$filename);
        break;
    }
    case "DELETE_FILE": {
        $filename = $_GET["file"];
        $status = unlink("upload/".$filename);
        break;
    }
    case "PREPARE_SEND_CONTENT":{
        if(!isset($_SESSION["mail"]))
        {
            $data = array("connected" => false);
            break;
        }

        $_SESSION["name"] = $_GET["name"];
        break;
    }
    case "NEW_PROJECT":
    {
        if (!isset($_SESSION["mail"])) {
            $data = array("connected" => false);
            break;
        }
        $db->createProject($_SESSION["mail"]);
        $data = array("connected" => (isset($_SESSION["mail"])), "id" => $db->countProjectPages(($_SESSION["mail"])));
        break;
    }
    case "NEW_SKILL":
    {
        if (!isset($_SESSION["mail"])) {
            $data = array("connected" => false);
            break;
        }
        $db->createSkill($_SESSION["mail"]);
        $data = array("connected" => (isset($_SESSION["mail"])), "id" => $db->countSkillPages($_SESSION["mail"]));
        break;
    }
}

$db->close();

echo json_encode($data);

exit();
