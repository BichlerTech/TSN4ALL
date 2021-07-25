
<?php
// Array with names
$command = $_REQUEST["command"];
//$q = "ich und du";
if($command == "project")
  echo file_get_contents ("../projects/test1/proj.dat");
else
  echo $req;
?>
