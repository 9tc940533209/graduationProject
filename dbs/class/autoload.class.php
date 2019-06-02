<?php
    spl_autoload_register(function ($classname){
        $filename = "./class/$classname.class.php";
        if(file_exists($filename))require_once($filename);
    });
?>