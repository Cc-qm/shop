<?php
    session_start();
    //  这种方法是将原来注册的某个变量销毁
    unset($_SESSION['loaded']);
    setcookie("name", "", time() - 3600);
    setcookie("PHPSESSID", "", time() - 3600);
    if(isset($_COOKIE[session_name()])) {
        setCookie(session_name(), "", time()-42000);
    }
    //  这种方法是销毁整个 Session 文件
    session_destroy();
?>