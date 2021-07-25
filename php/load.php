
<?php
// Array with names
$req = $_REQUEST["req"];
$q = $_REQUEST["q"];
//$q = "ich und du";
if($req == "config")
  echo file_get_contents ("../");
else
  echo $req;
?>
