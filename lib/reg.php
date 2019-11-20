<?php
//1.连接数据库
include('./conn.php');

//1.连接数据库
//2.接受数据
//3.验证数据
//4.根据验证结果进行操作 插入，提示

//2.接受数据
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
$email=$_REQUEST['email'];
$phone=$_REQUEST['phone'];

//3.验证数据 判断用户名是否存在
$sql="select * from testt where user_name='$username'";
$result=$mysqli->query($sql);//执行查询语句

if($result->num_rows>0){
    //数据库中有数据
    echo '<script>alert("用户名已存在");</script>';
    echo '<script>location.href="../register.html";</script>';
    $mysqli->close();
    die;
}

$insertSql="insert into testt(sid,user_name,password,email,phone) values(null,'$username','$password','$email','$phone')";

//当使用query函数执行插入操作的时候，返回的是插入的行数
$res=$mysqli->query($insertSql);

if($res){
    echo '<script>alert("注册成功！");</script>';
    echo '<script>location.href="../login.html"</script>';
}

$mysqli->close();
// $username=$_POST['username'];
//     $password=$_POST['password'];
//     $email=$_POST['email'];
//     $phone=$_POST['phone'];

//     if($username=='123456'&&$password=='123456'){
//         echo "<script>alert('注册成功！')</script>";
//         echo "<script>location.href='../login.html'</script>";
//     }else{
//         echo "<script>alert('格式不正确')</script>";
//         echo "<script>location.href='../register.html';</script>";
//     }
?>