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
        $mail = null;

        if (isset($_GET["visibility"]) && $_GET["visibility"] == "editor") {
            if (!isset($_SESSION["mail"])) {
                $data = array("connected" => false);
                break;
            }
            $mail = $_SESSION["mail"];
        } else {
            $mail = $_GET["mail"];
        }

        if (strtolower($_GET["name"]) == "homecontent") {
            $data = array("connected" => (isset($_SESSION["mail"])), "content" => $db->getHomeContent($mail));
        } else if (strpos(strtolower($_GET["name"]), "projet") !== false) {
            $id = explode("-", $_GET["name"]);
            $data = array("connected" => (isset($_SESSION["mail"])), "content" => $db->getProjectContent($mail, $id[1]));
        } else if (strpos(strtolower($_GET["name"]), "competence") !== false) {
            $id = explode("-", $_GET["name"]);
            $data = array("connected" => (isset($_SESSION["mail"])), "content" => $db->getSkillContent($mail, $id[1]));
        } else if (strtolower($_GET["name"]) == "aboutcontent") {
            $data = array("connected" => (isset($_SESSION["mail"])), "content" => $db->getAboutContent($mail));
        }
        break;
    }
    case "PORTFOLIO_EXIST": {
        if (!isset($_SESSION["mail"])) {
            $data = array("connected" => false);
            break;
        }

        if ($db->checkIfPortfolioExist($_SESSION["mail"])) {
            $data = array("connected" => true, "exist" => true);
        } else {
            $data = array("connected" => true, "exist" => false);
        }
        break;
    }
    case "GET_USER_INFO":{
        if (!isset($_GET["mail"])) {
            $data = array( "connected" => isset($_SESSION["mail"]), "info" => $db->getUserInfo($_SESSION["mail"]));
            break;
        } else {
            $data = array( "connected" => isset($_SESSION["mail"]), "info" => $db->getUserInfo($_GET["mail"]));
        }
        break;
    }
    case "GET_PAGE_LIST": {
        $mail = null;
        if (isset($_GET["mail"])) {
            $data = array("connected" => false);
            $mail = $_GET["mail"];
        } else if (isset($_SESSION["mail"])) {
            $data = array("connected" => true);
            $mail = $_SESSION["mail"];
        }
        $data = array("connected" => true);

        $data["skill"] = $db->getSkillPagesList($mail);
        $data["project"] = $db->getProjectPagesList($mail);
        break;
    }
}

$db->close();

echo json_encode($data);

exit();
