var parejaSeleccionada = 0;
var carta1, carta2;
var idCarta1, idCarta2;
var contadorParejas = null, totalParejas, numCartas;
var intentos = 0;
var permiteSeguir;
var peticionHTTP;
var tableroJuego;
var contadorAyudas;
var tiempo, cronometro;
var cartasDescubiertas = [];

function inicializarComponentes(){
	contadorParejas = document.getElementsByTagName('span')[0].innerHTML;
	totalParejas = contadorParejas;
	permiteSeguir = true;
	tableroJuego = document.getElementById('tabla').innerHTML;
	numCartas = document.getElementsByClassName('carta');
	tiempo = 0;
	cronometro = setInterval(contadorTiempo, 1000);
	contadorAyudas = 3;
	inicializarXHR();
}

function girarCarta(event) {
	parejaSeleccionada++;
		if (permiteSeguir == true) {
			// Están todas las cartas en juego boca abajo
			if (parejaSeleccionada == 1) {
				// El usuario ha elegido una carta
				carta1 = event.currentTarget;
				carta1.removeAttribute("onclick");
				idCarta1 = carta1.id;
				carta1.classList.add("cartaGirada");
			}
			else {
				// El usuario ha elegido las dos cartas
				permiteSeguir = false;
				carta2 = event.currentTarget;
				carta2.removeAttribute("onclick");
				idCarta2 = carta2.id;
				carta2.classList.add("cartaGirada");
				comprobarCartas();
			}
		}
		else {
			// Hay alguna carta en juego boca arriba
			parejaSeleccionada = 0;
		}
}

function volverGirarCartas() {
	carta1.classList.remove("cartaGirada");
	carta2.classList.remove("cartaGirada");
	carta1.setAttribute("onclick", "girarCarta(event)");
	carta2.setAttribute("onclick", "girarCarta(event)");
	permiteSeguir = true;
}

function comprobarCartas() {
	intentos++;
	document.getElementsByTagName('span')[1].innerHTML = intentos;
	if (idCarta1 != idCarta2) {
		// Las cartas son diferentes
		intentoFallido();
	}
	else {
		// Las cartas son iguales
		parejaRealizada();
		comprobarWin();
	}
}

function intentoFallido() {
	parejaSeleccionada = 0;
	setTimeout('volverGirarCartas()',500);
}

function parejaRealizada() {
	carta1.style.opacity = 0.7;
	carta2.style.opacity = 0.7;
	cartasDescubiertas.push(carta1);
	carta1 = "";
	carta2 = "";
	parejaSeleccionada = 0;
	contadorParejas--;
	document.getElementsByTagName('span')[0].innerHTML = contadorParejas;
	permiteSeguir = true;
}

function comprobarWin() {
	if (contadorParejas == 0) {
		// El contador de parejas llega a cero
		clearInterval(cronometro);
		document.getElementsByTagName('li')[1].style.opacity = 0.5;
		document.getElementsByTagName('li')[1].removeAttribute("onclick");
		Alert.render('Has ganado la partida con '+intentos+' intentos');
	}
}

function popUp() {
	this.render = function(dialog) { 
		var WinW = window.innerWidth; 
		var WinH = window.innerHeight; 
		var dialogoverlay = document.getElementById('dialogoverlay'); 
		var dialogbox = document.getElementById('dialogbox'); 
		dialogoverlay.style.width = "100%"; 
		dialogoverlay.style.height = WinH+"px";
		dialogbox.style.width = "35em"; 
		document.getElementById('dialogboxbody').innerHTML = dialog;
	} 

	this.cerrarPopUp = function() {
		document.getElementById('dialogbox').style.width = "0";
		document.getElementById('dialogoverlay').style.width = "0"; 
	} 
}

var Alert = new popUp();

function inicializarXHR() {
	// Prepara un objeto de peticion HTTP según el navegador
	if (window.XMLHttpRequest) peticionHTTP = new XMLHttpRequest();
	else peticionHTTP = new ActiveXObject("Microsoft.XMLHTTP");
}

function realizarPeticion(url, metodo, funcion) {
	// Define la acción
	peticionHTTP.onreadystatechange = funcion;
	// Realiza la petición
	peticionHTTP.open(metodo, url, true);
	peticionHTTP.send(null);
}

function guardarRanking(nombre, dificultad) {
	realizarPeticion('php/guardarRanking.php?nombre='+nombre+'&dificultad='+dificultad+'&intentos='+intentos, 'GET', null);
	Alert.cerrarPopUp();
}

function reiniciarPartida() {
	javascript:history.back(1);
}

function ayudaVisual() {
	if (contadorAyudas > 0 && contadorParejas >0) {
		// Al usuario le quedan ayudas y aún no ha terminado la partida
		for (i = 0; i < numCartas.length; i++) {
    		numCartas[i].classList.add("cartaGirada");
    		numCartas[i].removeAttribute("onclick");
		}
		intentos += 5;;
		document.getElementsByTagName('span')[1].innerHTML = intentos;
		setTimeout('finAyudaVisual()',3000);
	}
	if (contadorAyudas == 1) {
		// El usuario ya no dispone de más ayudas
		document.getElementsByTagName('li')[1].style.opacity = 0.5;
		document.getElementsByTagName('li')[1].removeAttribute("onclick");
	}
	contadorAyudas--;
	document.getElementsByTagName('span')[3].innerHTML = contadorAyudas;
}

function finAyudaVisual() {
	for (i = 0; i < numCartas.length; i++) {
		var coincidencias = 0;
		// Vuelve a girar todas las cartas
		for (x = 0; x < cartasDescubiertas.length; x++) {
			if (cartasDescubiertas[x].id == numCartas[i].id) {
				coincidencias++;
			}
		}
		if (coincidencias == 0) {
			numCartas[i].classList.remove("cartaGirada");
			numCartas[i].setAttribute("onclick", "girarCarta(event)");
		}
	}
}

function contadorTiempo() {
	tiempo++;
	document.getElementsByTagName('span')[2].innerHTML = tiempo;
}