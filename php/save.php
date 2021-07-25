<?php
// Array with names
$command = $_REQUEST["command"];
$value = $_REQUEST["value"];
//$q = "ich und du";
if($command == "project")
  file_put_contents ("../projects/test1/proj.dat", $value);
  echo $value;
else if ($command == "config")
  file_put_contents ("config.dat", $value);
?>
