<?php
//1.连接数据库
include('./conn.php');

//2.接收数据
$phone=$_REQUEST['phone'];
$password=$_REQUEST['password'];
$right=$_REQUEST['right'];

//3.验证数据 判断用户手机号是否存在

$sql="select * from user where phone='$phone'";
$result=$mysqli->query($sql);

if($result->num_rows>0){
    echo '<script>alert("用户名已存在");</script>';
    $mysqli->close();
    die;
}

$insertSql="insert into user(sid,phone,`password`,`right`) values(null,'$phone','$password','$right')";

//执行插入操作，返回插入的行数

$res=$mysqli->query($insertSql);

if($res){
    echo "location.href='http://localhost/erjieduan/changhong/src/html/login.html';";
}

$mysqli->close();
?>