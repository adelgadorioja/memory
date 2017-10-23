<!DOCTYPE html>
<html>
<head>
	<title> Memory </title>
	<link rel="stylesheet" type="text/css" href="style/reset.css">
	<link rel="stylesheet" type="text/css" href="style/style.css">
	<script type="text/javascript" src="script.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>
<body onload="inicializarComponentes()">

<?php
	$dificultad = $_POST["Dificultad"];
?>

<header>
	<h1>MEMORY</h1>
	<p>Parejas restantes: <span><?php echo pow($dificultad,2)/2 ?></span></p>
	<p>Intentos: <span>0</span></p>
</header>
<div class="triangulo"></div>

<div id="dialogoverlay"></div> 
<section>
	<table>
	<?php
		$nombre = $_POST["Nombre"];
		$arrayCartas = [];
		$numeroCartas = pow($dificultad,2);
		for ($i=0; $i < $numeroCartas/2; $i++) {
			// Se crean cartas duplicadas (parejas)
			array_push($arrayCartas,"carta".$i);
			array_push($arrayCartas,"carta".$i);
		}

		shuffle($arrayCartas);
		// Se mezclan las cartas

		for ($i=0; $i < $numeroCartas; $i = $i+$dificultad) {
			// Número de filas que tendrá el tablero
			echo "<tr>";
			for ($y=0; $y < $dificultad; $y++) {
				// Número de cartas por cada fila
				// Se crean los divs con sus respectivos ID y sus backgrounds
				$num = $i + $y;
				echo "
				<td>
					<div id='$arrayCartas[$num]' class='carta' onclick='girarCarta(event)'>
						<div class='flipper'>
							<div class='cara'></div>
							<div style='background-image: url(img/$arrayCartas[$num].png)' class='dorso'></div>
						</div>
					</div>
				</td>";
			}	
			echo "</tr>";
		}
	?>
	</table>

	<!-- Componentes invisibles para realizar el Pop-up -->
	<div id="dialogbox">
		<div>
			<div id="dialogboxhead">ENHORABUENA</div>
			<div id="dialogboxbody"></div> 
			<div id="dialogboxfoot" onclick="guardarRanking('<?php echo $nombre ?>', '<?php echo $dificultad ?>')">ACEPTAR</div>
		</div>
	</div>

</section>

</body>
</html>