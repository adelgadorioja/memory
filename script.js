var parejaSeleccionada = 0;
var carta1, carta2;
var idCarta1, idCarta2;
var contadorParejas = null;
var intentos = 0;
var permiteSeguir;

function inicializarComponentes(){
	contadorParejas = document.getElementsByTagName('span')[0].innerHTML;
	permiteSeguir = true;
}

function girarCarta(event) {
	parejaSeleccionada++;
		if (permiteSeguir == true) {
			if (parejaSeleccionada == 1) {
				carta1 = event.currentTarget;
				carta1.removeAttribute("onclick");
				idCarta1 = carta1.id;
				carta1.classList.add("cartaGirada");
			}
			else {
				permiteSeguir = false;
				carta2 = event.currentTarget;
				carta2.removeAttribute("onclick");
				idCarta2 = carta2.id;
				carta2.classList.add("cartaGirada");
				comprobarCartas();
			}
		}
		else {
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
		intentoFallido();
	}
	else {
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
	carta1 = "";
	carta2 = "";
	parejaSeleccionada = 0;
	contadorParejas--;
	document.getElementsByTagName('span')[0].innerHTML = contadorParejas;
	permiteSeguir = true;
}

function comprobarWin() {
	if (contadorParejas == 0) {
		Alert.render('Has ganado la partida con '+intentos+' intentos');
	}
}

function i() {
	this.render = function(dialog) { 
		var WinW = window.innerWidth; 
		var WinH = window.innerHeight; 
		var dialogoverlay = document.getElementById('dialogoverlay'); 
		var dialogbox = document.getElementById('dialogbox'); 
		dialogoverlay.style.width = "100%"; 
		dialogoverlay.style.height = WinH+"px";
		dialogbox.style.width = "35em"; 
		document.getElementById('dialogboxhead').innerHTML = "ENHORABUENA"; 
		document.getElementById('dialogboxbody').innerHTML = dialog; 
		document.GetElementById('dialogboxfoot').innerHTML = "ACEPTAR";
	} 

	this.ok = function() { 
		document.getElementById('dialogbox').style.width = "0";
		document.getElementById('dialogoverlay').style.width = "0"; 
	} 
}

var Alert = new i();