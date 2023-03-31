<?php

include "Database.php";

$requestedData = $_GET["command"];
$data = array("result" => null);
$db = Database::getInstance();

switch ($requestedData) {
    case "ALL_USER_PORTFOLIO": {
        $data = array("result" => $db->getAllUserHome());
    }
}

$db->close();

echo json_encode($data);

exit();
