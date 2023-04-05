<?php

include "Database.php";

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
        $file = move_uploaded_file($_FILES["file"]["tmp_name"], "./uploads/".$_SESSION["mail"]."/".$_FILES["file"]["name"]);
        break;
    }
}

$db->close();

echo json_encode($data);

exit();
