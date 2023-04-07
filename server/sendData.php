<?php

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

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
    }
    case "SAVE_FILE":{
        $filename = generateUUID(openssl_random_pseudo_bytes(16));
        $file = move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$filename);
        $data = array("connected" => true, "link" => "upload/".$filename);
        break;
    }
    case "SEND_CONTENT":{
        if(!isset($_SESSION["mail"]))
        {
            $data = array("connected" => false);
            break;
        }

        if(strtolower($_GET["name"])=="homecontent")
        {
            $db->setHomeContent($_SESSION["mail"],$_GET["content"]);
            break;
        }
        else if(strpos(strtolower($_GET["name"]), "projet")!==false)
        {
            $id = explode("-", $_GET["name"]);
            $db->setProjectContent($_SESSION["mail"],$_GET["content"],$id[1]);
            break;
        }
        else if(strpos(strtolower($_GET["name"]), "competence")!==false)
        {
            $id = explode("-", $_GET["name"]);
            $db->setSkillContent($_SESSION["mail"],$_GET["content"],$id[1]);
            break;
        }
    }
}

$db->close();

echo json_encode($data);

exit();
