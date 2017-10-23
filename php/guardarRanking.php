<?php
	$nombreArchivo = "../ranking.txt";
	$nombre = $_GET['nombre'];
	$dificultad = $_GET['dificultad'];
	$intentos = $_GET['intentos'];
	try {
		$archivo = fopen($nombreArchivo, "a");
		fwrite($archivo, "$nombre | $intentos | $dificultad\n");
		fclose($archivo);
	}
	catch (Exception $e){
		alert("Ha surgido un error al guardar tus datos.");
	}
?>