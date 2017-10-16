var parejaSeleccionada = 0;
var carta1, carta2;
var idCarta1, idCarta2;
var contadorParejas = null;
var intentos = 0;

function inicializarComponentes(){
	contadorParejas = document.getElementsByTagName('span')[0].innerHTML;
}

function girarCarta(event) {
	parejaSeleccionada++;

	if (parejaSeleccionada == 1) {
		carta1 = event.currentTarget;
		carta1.removeAttribute("onclick");
		idCarta1 = carta1.id;
		carta1.classList.add("cartaGirada");
	}

	else {
		carta2 = event.currentTarget;
		carta2.removeAttribute("onclick");
		idCarta2 = carta2.id;
		carta2.classList.add("cartaGirada");
		comprobarCartas();
	}

}

function volverGirarCartas() {
	carta1.classList.remove("cartaGirada");
	carta2.classList.remove("cartaGirada");
	carta1.setAttribute("onclick", "girarCarta(event)");
	carta2.setAttribute("onclick", "girarCarta(event)");
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
	carta1 = "";
	carta2 = "";
	parejaSeleccionada = 0;
	contadorParejas--;
	document.getElementsByTagName('span')[0].innerHTML = contadorParejas;
}

function comprobarWin() {
	if (contadorParejas == 0) {
		alert("Enhorabuena! Has ganado la partida.");
	}
}