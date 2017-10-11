var parejaSeleccionada = 0;
var carta1, carta2;
var idCarta1, idCarta2;
var contadorParejas = 0;

function girarCarta(event) {
	parejaSeleccionada++;

	if (parejaSeleccionada == 1) {
		carta1 = event.currentTarget;
		carta1.removeAttribute = "girarCarta(event)";
		idCarta1 = carta1.id;
		carta1.classList.add("cartaGirada");
	}

	else {
		carta2 = event.currentTarget;
		carta2.removeAttribute = "girarCarta(event)";
		idCarta2 = carta2.id;
		carta2.classList.add("cartaGirada");
		comprobarCartas();
	}
}

function volverGirarCartas() {
	carta1.classList.remove("cartaGirada");
	carta2.classList.remove("cartaGirada");
	carta1.addAttribute = "girarCarta(event)";
	carta2.addAttribute = "girarCarta(event)";
}

function comprobarCartas() {
	if (idCarta1 != idCarta2) {
		parejaSeleccionada = 0;
		setTimeout('volverGirarCartas()',500);
	}
	else {
		carta1 = "";
		carta2 = "";
		parejaSeleccionada = 0;
		contadorParejas++;
		partidaGanada();
	}
}

function partidaGanada() {
	// COMPROBACIÓN DE SI HA GANADO
}