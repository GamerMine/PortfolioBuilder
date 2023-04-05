<?php

include "Database.php";

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);

$requestedData = $_GET["command"];
$data = array("result" => null);
$db = Database::getInstance();

session_start();

switch ($requestedData) {
    case "ALL_USER_PORTFOLIO": {
        $data = array("result" => $db->getAllUserHome());
        break;
    }
    case "USER_PORTFOLIO": {
        $data = array("content" => $db->getUserHome($_GET["mail"]));
        break;
    }
    case "GET_LOCATION": {
        $data = array("result" => $_SESSION["location"]);
        break;
    }
    case "GET_CONTENT": {
        if (strtolower($_GET["name"]) == "homecontent") {
            $data = array("content" => $db->getHomeContent($_GET["mail"]));
        }
        break;
    }
}

$db->close();

echo json_encode($data);

exit();
