<?php

include "Database.php";

$sentCommand = $_GET["command"];
$db = Database::getInstance();

session_start();

switch ($sentCommand) {
    case "SET_LOCATION": {
        $_SESSION["location"] = $_GET["location"];
        break;
    }
}

$db->close();

exit();
