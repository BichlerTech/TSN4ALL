<?php
// Array with names
$command = $_REQUEST["command"];
$value = $_REQUEST["value"];
//$q = "ich und du";
if($command == "project")
  file_put_contents ("project.dat", $value);
else if ($command == "config")
  file_put_contents ("config.dat", $value);
?>