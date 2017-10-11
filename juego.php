<!DOCTYPE html>
<html>
<head>
	<title> Memory </title>
	<link rel="stylesheet" type="text/css" href="style/reset.css">
	<link rel="stylesheet" type="text/css" href="style/style.css">
	<script type="text/javascript" src="script.js"></script>
</head>
<body>

<section>
	<table>
	<?php
		$dificultad = $_POST["Dificultad"];
		$arrayCartas = [];
		$numeroCartas = pow($dificultad,2);
		for ($i=0; $i < $numeroCartas/2; $i++) { 
			array_push($arrayCartas,"carta".$i);
			array_push($arrayCartas,"carta".$i);
		}

		shuffle($arrayCartas);

		for ($i=0; $i < $numeroCartas; $i = $i+$dificultad) {
			echo "<tr>";
			for ($y=0; $y < $dificultad; $y++) {
				$num = $i + $y;
				echo "
				<td>
					<div id='$arrayCartas[$num]' class='carta' onclick='girarCarta(event)'>
						<div class='flipper'>
							<div class='cara'></div>
							<div style='background-image: url(img/$arrayCartas[$num].jpg)' class='dorso'></div>
						</div>
					</div>
				</td>";
			}	
			echo "</tr>";
		}
	?>
	</table>
</section>

</body>
</html>