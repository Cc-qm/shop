<?php
    $loaded = false;
    session_start();
    //  判断是否登陆
    if (isset($_SESSION["loaded"]) && $_SESSION["loaded"] === true) {
        echo json_encode(array("loaded"=>true));
    } else {
        //  验证失败，将 $_SESSION["admin"] 置为 false
        $_SESSION["loaded"] = false;
        echo json_encode(array("loaded"=>false));
    }

?>