<?php

function prepareData($data) {
    $data = trim($data);
    $data = stripslashes($data);
    return htmlentities($data);
}
