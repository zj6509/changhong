<?php
include('./conn.php');

$idnav=$_REQUEST['idnav'];

$sql = "select * from goods where id in ($idnav)";

$res = $mysqli->query($sql);


$arr = array();

while($row = $res->fetch_assoc()){
    array_push($arr,$row);
}

$json = json_encode($arr);

echo $json;

$mysqli->close();
?>