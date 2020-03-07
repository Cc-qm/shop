<?php
    //  清除一些空白符号
    foreach ($_REQUEST as $key => $value) {
        $_REQUEST[$key] = trim($value);
    }
    
    $username=$_REQUEST["username"];
    $password=$_REQUEST["password"];
    
    $link=mysqli_connect("localhost","root","","shop");
    if (strlen($username)==11) {
        $sql="SELECT * FROM `users` WHERE `phone`='$username' AND `password`='$password';";
    }elseif(strstr($username,"@")){
        $sql="SELECT * FROM `users` WHERE `email`='$username' AND `password`='$password';";
    }else{
        $sql="SELECT * FROM `users` WHERE `ID`='$username' AND `password`='$password';";
    }

    $res=mysqli_query($link,$sql);
    $data=mysqli_fetch_ASSOC($res);
    mysqli_close($link);
    if ($data) {
        session_start();
        $_SESSION["loaded"]=true;
        // setcookie("login",true);
        // setcookie("ID",$data["ID"]);
        setcookie("name",$data["name"]);
        
        echo json_encode(array("status"=>"success","data"=>$data));
    }else{
        echo json_encode(array("status"=>"error","data"=>$data));
    }
    
    // $arr=array("username"=>$username,"password"=>$password);
    
?>