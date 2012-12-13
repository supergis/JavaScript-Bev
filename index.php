<?php
    $filename = $_POST["page_name"];
    $data = $_POST["text"];
	touch($filename);
    $handle = fopen($filename,"rb+");
    flock($handle,LOCK_EX);
    fwrite($handle,$data);
    ftruncate($handle,strlen($data));
    fclose($handle);
    chmod($filename,0777);
	echo "{'success':true}";
?>