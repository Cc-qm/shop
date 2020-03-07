<?php
    $ID=$_REQUEST["ID"];
    $name=$_REQUEST["name"];
    $password=$_REQUEST["password"];
    $phone=$_REQUEST["phone"];
    $email=$_REQUEST["email"];
    $sex=$_REQUEST["sex"];
    $address=$_REQUEST["address"];

    $link=mysqli_connect("localhost","root","","shop");
    $sql="INSERT INTO `users` VALUES ('$ID','$name','$sex','$password','$address','$email','$phone')";
    $res=mysqli_query($link,$sql);
    mysqli_close($link);
    echo json_encode(array("status"=>$res));
?>