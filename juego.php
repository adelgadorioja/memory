<!DOCTYPE html>
<html>
<head>
	<title> Memory </title>
	<link rel="stylesheet" type="text/css" href="style/reset.css">
	<link rel="stylesheet" type="text/css" href="style/style.css">
	<script type="text/javascript" src="script.js"></script>
	<!--<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">-->
</head>
<body onload="inicializarComponentes()">

<?php
	session_start();
	if (!isset($_SESSION['barajar']) || $_SESSION['barajar'] == true || $_SESSION['nuevoUsuario'] == true) {
		$_SESSION['nuevoUsuario'] = false;
		$_SESSION['$dificultad'] = $_POST["Dificultad"];
		$_SESSION['$nombre'] = $_POST["Nombre"];
		$_SESSION['$arrayCartas'] = [];
		$_SESSION['$numeroCartas'] = pow($_SESSION['$dificultad'],2);
		for ($i=0; $i < $_SESSION['$numeroCartas']/2; $i++) {
			// Se crean cartas duplicadas (parejas)
			array_push($_SESSION['$arrayCartas'],"carta".$i);
			array_push($_SESSION['$arrayCartas'],"carta".$i);
		}
		shuffle($_SESSION['$arrayCartas']);
		// Se mezclan las cartas
	}
	$_SESSION['barajar'] = false;
	
?>

<header>
	<h1>MEMORY</h1>
	<p>Parejas restantes: <span><?php echo pow($_SESSION['$dificultad'],2)/2 ?></span></p>
	<p>Intentos: <span>0</span></p>
	<p>Tiempo: <span>0</span></p>
	<p>Ayudas restantes: <span>3</span></p>
</header>
<div id="opciones">
	<ul>
		<li onclick="reiniciarPartida()">reiniciar</li>
		<li onclick="ayudaVisual()">ayuda</li>
		<a href="ranking.php"><li>ver ránking</li></a>
	</ul>
</div>

<div id="dialogoverlay"></div> 
<section>
	<table id="tabla">
	<?php
		for ($i=0; $i < $_SESSION['$numeroCartas']; $i = $i+$_SESSION['$dificultad']) {
			// Número de filas que tendrá el tablero
			echo "<tr>";
			for ($y=0; $y < $_SESSION['$dificultad']; $y++) {
				// Número de cartas por cada fila
				// Se crean los divs con sus respectivos ID y sus backgrounds
				$num = $i + $y;
				echo "
				<td>
					<div id='".$_SESSION['$arrayCartas'][$num]."' class='carta' onclick='girarCarta(event)'>
						<div class='flipper'>
							<div class='cara'></div>
							<div style='background-image: url(img/".$_SESSION['$arrayCartas'][$num].".png)' class='dorso'></div>
						</div>
					</div>
				</td>";
			}	
			echo "</tr>";
		}
	?>
	</table>

	<!-- Componentes invisibles para realizar el Pop-up de WIN -->
	<div id="dialogbox">
		<div>
			<div id="dialogboxhead">ENHORABUENA</div>
			<div id="dialogboxbody"></div> 
			<div id="dialogboxfoot" onclick="guardarRanking('<?php echo $_SESSION['$nombre'] ?>', '<?php echo $_SESSION['$dificultad'] ?>')">ACEPTAR</div>
		</div>
	</div>

</section>

</body>
</html>