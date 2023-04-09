<?php
include "Database.php";

header('Content-type: application/json');

session_start();
$db = Database::getInstance();

$json = file_get_contents('php://input');
$json_decode = json_decode($json, true);
$json_encode = json_encode($json_decode);

if(strtolower($_SESSION["name"])=="homecontent") {
    $db->setHomeContent($_SESSION["mail"], $json_encode);
}
else if(strpos(strtolower($_SESSION["name"]), "projet")!==false)
{
    $id = explode("-", $_SESSION["name"]);
    $db->setProjectContent($_SESSION["mail"],$json_encode,$id[1]);
}
else if(strpos(strtolower($_SESSION["name"]), "competence")!==false)
{
    $id = explode("-", $_SESSION["name"]);
    $db->setSkillContent($_SESSION["mail"],$json_encode,$id[1]);
}
else if (strtolower($_SESSION["name"]) == "aboutcontent") {
    $db->setInfoContent($_SESSION["mail"],$json_encode);
}