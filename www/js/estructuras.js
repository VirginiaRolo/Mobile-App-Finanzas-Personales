const URLBASE = "https://dwallet.develotion.com";

const ROUTER = document.querySelector("#ruteo");
const MENU = document.querySelector("#menu");
const HOME = document.querySelector("#pantalla-home");
const LOGIN = document.querySelector("#pantalla-login");
const REGISTRO = document.querySelector("#pantalla-registro");
const GASTO = document.querySelector("#pantalla-agregarGasto");
const INGRESO = document.querySelector("#pantalla-agregarIngreso");
const LISTADO = document.querySelector("#pantalla-listadoMovimientos");
const MONTOS = document.querySelector("#pantalla-montosTotales");
const MAPA = document.querySelector("#pantalla-mapa");
// const NAV = document.querySelector("ion-nav");
const NAV = document.querySelector("#menuNavegacion");

class Usuario {
	constructor(username, pass, idDepart, idCiud) {
		this.usuario = username;
		this.password = pass;
		this.idDepartamento = idDepart;
		this.idCiudad = idCiud;
	}
}

class LoginDTO {
	constructor(user, password) {
		this.usuario = user;
		this.password = password;
	}
}

class GastoDTO {
	constructor(idUsu, co, ca, t, m, f) {
		this.idUsuario = idUsu;
		this.concepto = co;
		this.categoria = ca;
		this.total = t;
		this.medio = m;
		this.fecha = f;
	}
}

class IngresoDTO {
	constructor(idUsu, co, ca, t, m, f) {
		this.idUsuario = idUsu;
		this.concepto = co;
		this.categoria = ca;
		this.total = t;
		this.medio = m;
		this.fecha = f;
	}
}

getLocation();

let lat = null;
let long = null;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarUbicacion);
	} else {
		console.log("Dispositivo no soporta GPS");
	}
}

function mostrarUbicacion(position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;
}
