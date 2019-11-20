<?php
//1.连接数据库
include('./conn.php');

//2.接收数据
$phone=$_REQUEST['phone'];
$password=$_REQUEST['password'];

//3.验证数据，判断用户是否存在
$sql="select * from user where phone='$phone' and password='$password'";
$result=$mysqli->query($sql);


//echo $result;
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    if($row['phone']===$phone){
        echo "location.href='http://localhost/erjieduan/changhong/src/html/index.html';";
    }
}else{
    echo 'alert("用户名或密码不正确！");';
}



?>