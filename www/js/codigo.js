inicio();

function inicio() {
	eventos();
	armarMenuOpciones();
}

function dqs(id) {
	return document.querySelector("#" + id);
}

function eventos() {
	ROUTER.addEventListener("ionRouteDidChange", navegar);

	dqs("btnRegistrar").addEventListener("click", tomarDatosRegistro);
	dqs("btnLogin").addEventListener("click", tomarDatosLogin);
	dqs("slcRegDepartamento").addEventListener("ionChange",ciudadesPorDepartamento);
	dqs("btnAgregarGasto").addEventListener("click", tomarDatosAgregarGasto);
	dqs("btnAgregarIngreso").addEventListener("click", tomarDatosAgregarIngreso);
}

//#region Menú Opciones
function armarMenuOpciones() {
	dqs("menuOpciones").innerHTML = ``;

	let hayToken = localStorage.getItem("apikey");

	if (hayToken) {
		// console.log("Hay token");
		dqs(
			"menuOpciones"
		).innerHTML = `<ion-item href="/" onclick="cerrarMenu()">Home</ion-item>
		<ion-item href="/movGasto" onclick="cerrarMenu();limpiarCamposAG();cargarRubroGastos()">Agregar gasto</ion-item>
		<ion-item href="/movIngreso" onclick="cerrarMenu();limpiarCamposING();cargarRubroIngresos()">Agregar ingreso</ion-item>
		<ion-item href="/listadoMovs" onclick="cerrarMenu();listarMovimientos()">Listar movimientos</ion-item>
		<ion-item href="/montosTotales" onclick="cerrarMenu();montosTotales()">Montos totales</ion-item>
		<ion-item href="/verMapa" onclick="cerrarMenu();setTimeout(function(){crearMapa()}, 1000)">Ver mapa</ion-item>
		<ion-item href="/" onclick="cerrarMenu();desloguear()">Logout</ion-item>
		<ion-button class="ion-margin-top" strong="true" expand="block" fill="outline" onclick="cerrarMenu();compartir()">Compartir</ion-button>`;
	} else {
		// console.log("No hay token");
		dqs(
			"menuOpciones"
		).innerHTML = `<ion-item href="/" onclick="cerrarMenu()">Home</ion-item>
        <ion-item href="/login" onclick="cerrarMenu()">Login</ion-item>
        <ion-item href="/registro" onclick="cerrarMenu();cargarDepartamentos();cargarCiudades()">Registro</ion-item>`;
	}
}
//#endregion

//#region Navegación
function navegar(evt) {
	ocultarTodo();

	const ruta = evt.detail.to;

	if (ruta == "/") {
		HOME.style.display = "block";
	} else if (ruta == "/login") {
		LOGIN.style.display = "block";
	} else if (ruta == "/logout") {
		HOME.style.display = "block";
	} else if (ruta == "/registro") {
		REGISTRO.style.display = "block";
	} else if (ruta == "/movGasto") {
		GASTO.style.display = "block";
	} else if (ruta == "/movIngreso") {
		INGRESO.style.display = "block";
	} else if (ruta == "/listadoMovs") {
		LISTADO.style.display = "block";
	} else if (ruta == "/montosTotales") {
		MONTOS.style.display = "block";
	} else if (ruta == "/verMapa") {
		MAPA.style.display = "block";
	}
}
//#endregion

//#region Ocultar Todo
function ocultarTodo() {
	HOME.style.display = "none";
	LOGIN.style.display = "none";
	REGISTRO.style.display = "none";
	GASTO.style.display = "none";
	INGRESO.style.display = "none";
	LISTADO.style.display = "none";
	MONTOS.style.display = "none";
	MAPA.style.display = "none";
}
//#endregion

function cerrarMenu() {
	MENU.close();
}

//#region LimpiarCampos
function limpiarCampos() {
	dqs("slcRegDepartamento").innerHTML = ``;
	dqs("slcRegCiudad").innerHTML = ``;
	//dqs("txtLoginUsuario").value = "";
	//dqs("txtLoginPass").value = "";
	dqs("txtConceptoGasto").value = ``;
	dqs("slcRubroGasto").value = ``;
	dqs("txtTotalGasto").value = ``;
	dqs("slcMedioGasto").value = ``;
	document.querySelector("ion-datetime").value = ``;
	dqs("pAgregarGto").innerHTML = ``;
	dqs("slcRubroGasto").innerHTML = ``;
	dqs("txtConceptoIngreso").value = ``;
	dqs("slcRubroIngreso").value = ``;
	dqs("txtTotalIngreso").value = ``;
	dqs("slcMedioIngreso").value = ``;
	dqs("fechaIngreso").value = ``;
	dqs("pAgregarIng").innerHTML = ``;
	dqs("slcRubroIngreso").innerHTML = ``;
	dqs("listadoMovGastos").innerHTML = ``;
	dqs("listadoMovIngresos").innerHTML = ``;
	dqs("pListadoMov").innerHTML = ``;
	dqs("totalGastos").innerHTML = ``;
	dqs("totalIngresos").innerHTML = ``;
	dqs("totalSaldo").innerHTML = ``;
}
//#endregion

//#region Departamentos
function cargarDepartamentos() {
	fetch(`${URLBASE}/departamentos.php`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			if (response.status != 200) {
				dqs("pMsgRegistro").innerHTML = response.statusText;
			} else {
				return response.json();
			}
		})
		.then(function (dataListaDepartamentos) {
			console.log(dataListaDepartamentos);

			dqs("slcRegDepartamento").innerHTML = ``;

			for (let depart of dataListaDepartamentos.departamentos) {
				dqs(
					"slcRegDepartamento"
				).innerHTML += `<ion-select-option value="${depart.id}">${depart.nombre}</ion-select-option>`;
			}
		})
		.catch(function (error) {
			console.log(error);
			dqs("pMsgRegistro").innerHTML = "Error";
		});
}
//#endregion

//#region Ciudades
function cargarCiudades() {
	fetch(`${URLBASE}/ciudades.php`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			console.log(response);

			if (response.status != 200) {
				dqs("pMsgRegistro").innerHTML = response.statusText;
			} else {
				return response.json();
			}
		})
		.then(function (dataListaCiudades) {
			console.log(dataListaCiudades);

			dqs("slcRegCiudad").innerHTML = ``;

			for (let ciu of dataListaCiudades.ciudades) {
				dqs(
					"slcRegCiudad"
				).innerHTML += `<ion-select-option value="${ciu.id}">${ciu.nombre}</ion-select-option>`;
			}
		})
		.catch(function (error) {
			console.log(error);
			dqs("pMsgRegistro").innerHTML = "Error";
		});
}

function ciudadesPorDepartamento(evento) {
	console.log(evento);

	let idDepartamento = evento.detail.value;
	console.log(idDepartamento);

	fetch(`${URLBASE}/ciudades.php?idDepartamento=${idDepartamento}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			console.log(response);

			if (response.status != 200) {
				dqs("pMsgRegistro").innerHTML = response.statusText;
			} else {
				return response.json();
			}
		})
		.then(function (dataListaCiudades) {
			console.log(dataListaCiudades);

			dqs("slcRegCiudad").innerHTML = ``;

			for (let ciu of dataListaCiudades.ciudades) {
				dqs(
					"slcRegCiudad"
				).innerHTML += `<ion-select-option value="${ciu.id}">${ciu.nombre}</ion-select-option>`;
			}
		})
		.catch(function (error) {
			console.log(error);
			dqs("pMsgRegistro").innerHTML = "Error";
		});
}
//#endregion

//#region Registro
function tomarDatosRegistro() {
	mostrarLoader("Registrando usuario...", 1000, true, "dots");
	let usuario = dqs("txtRegUsuario").value;
	let pass = dqs("txtRegPass").value;
	let idDepartamento = parseInt(dqs("slcRegDepartamento").value);
	let idCiudad = parseInt(dqs("slcRegCiudad").value);

	if (usuario == "" || pass == "" || idDepartamento == NaN || idCiudad == NaN) {
		setTimeout(function () {
			presentAlert("REGISTRO", "ERROR", "Faltan datos");
		}, 1500);
		//presentAlert("REGISTRO", "ERROR", "Faltan datos");
		//dqs("pMsgRegistro2").innerHTML = "Faltan datos";
	} else {
		let usu = new Usuario(usuario, pass, idDepartamento, idCiudad);
		registrar(usu);
	}
}

function registrar(objUsuario) {
	fetch(`${URLBASE}/usuarios.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(objUsuario),
	})
		.then(function (response) {
			console.log(response);

			return response.json();
		})
		.then(function (codigo) {
			console.log(codigo);

			let msgError = codigo.mensaje;

			if (codigo.codigo != 200) {
				setTimeout(function () {
					presentAlert("REGISTRO", "ERROR", msgError);
				}, 1500);
				//presentAlert("REGISTRO", "ERROR", msgError);
				//dqs("pMsgRegistro").innerHTML = msgError;
			} else {
				setTimeout(function () {
					presentAlert("REGISTRO", "EXITOSO", "Alta correcta");
				}, 1500);
				//presentAlert("REGISTRO", "EXITOSO", "Alta correcta");
				//dqs("pMsgRegistro").innerHTML = "Alta correcta";
				localStorage.setItem("usuario", objUsuario.usuario);
				localStorage.setItem("pass", objUsuario.password);
				NAV.push("page-login");
				completarCampos();
				armarMenuOpciones();
			}
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("REGISTRO", "ERROR", "Error");
			}, 1500);
			//presentAlert("REGISTRO", "ERROR", "Error");
			//dqs("pMsgRegistro").innerHTML = "Error";
		});
}
//#endregion

//#region Login y Logout
function tomarDatosLogin() {
	limpiarCampos();
	mostrarLoader("Iniciando sesión...", 1000, true, "dots");
	let user = dqs("txtLoginUsuario").value;
	let pass = dqs("txtLoginPass").value;

	if (user == "" || pass == "") {
		setTimeout(function () {
			presentAlert("LOGIN", "ERROR", "Faltan datos");
		}, 1500);
		//dqs("pMsgLogin2").innerHTML = "Faltan datos";
	} else {
		let usuLogin = new LoginDTO(user, pass);
		loguear(usuLogin);
	}
	dqs("txtLoginUsuario").value = "";
	dqs("txtLoginPass").value = "";
}

function completarCampos() {
	let usu = localStorage.getItem("usuario");
	let pass = localStorage.getItem("pass");
	dqs("txtLoginUsuario").value = usu;
	dqs("txtLoginPass").value = pass;
}

function loguear(objLoginDTO) {
	fetch(`${URLBASE}/login.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(objLoginDTO),
	})
		.then(function (response) {
			console.log(response);

			return response.json();
		})
		.then(function (codigo) {
			console.log(codigo);

			let msgError = codigo.mensaje;

			if (codigo.codigo != 200) {
				setTimeout(function () {
					presentAlert("LOGIN", "ERROR", msgError);
				}, 1500);
				//dqs("pMsgLogin").innerHTML = msgError;
			} else {
				localStorage.setItem("apikey", codigo.apiKey);
				localStorage.setItem("id", codigo.id);

				NAV.push("page-home");
				armarMenuOpciones();
			}
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("LOGIN", "ERROR", "Error");
			}, 1500);
			//dqs("pMsgLogin").innerHTML = "Error";
		});
}

function desloguear() {
	// localStorage.clear();
	localStorage.removeItem("apikey");
	localStorage.removeItem("usuario");
	localStorage.removeItem("pass");

	NAV.push("page-login");

	armarMenuOpciones();
}
//#endregion

//AGREGAR MOVIMIENTOS

//#region AgregarGasto
function limpiarCamposAG() {
	dqs("txtConceptoGasto").value = ``;
	dqs("slcRubroGasto").value = ``;
	dqs("txtTotalGasto").value = ``;
	dqs("slcMedioGasto").value = ``;
	document.querySelector("ion-datetime").value = ``;
	dqs("pAgregarGto").innerHTML = ``;
}

function tomarDatosAgregarGasto() {
	let idUsu = Number(localStorage.getItem("id"));
	let co = document.querySelector("#txtConceptoGasto").value;
	let ca = Number(document.querySelector("#slcRubroGasto").value);
	let t = Number(document.querySelector("#txtTotalGasto").value);
	let m = document.querySelector("#slcMedioGasto").value;
	let fechaCompleta = document.querySelector("#fechaGasto").value;
	let f = fechaCompleta.slice(0, 10);

	if (co == "" || ca == NaN || t == NaN || m == "" || f == "") {
		mostrarLoader("Cargando...", 1000, true, "dots");
		setTimeout(function () {
			presentAlert("AGREGAR GASTO", "ERROR", "Faltan datos");
		}, 1500);
		//dqs("pAgregarGto").innerHTML = "Faltan datos";
	} else {
		let g = new GastoDTO(idUsu, co, ca, t, m, f);
		agregarGasto(g);
		mostrarLoader("Agregando movimiento...", 1000, true, "dots");
	}
}

function agregarGasto(unGasto) {
	limpiarCamposAG();

	let apikey = localStorage.getItem("apikey");

	fetch(`${URLBASE}/movimientos.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
		body: JSON.stringify(unGasto),
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (codigo) {
			console.log(codigo);

			if (codigo.codigo == 200) {
				setTimeout(function () {
					presentAlert("AGREGAR GASTO", "EXITOSO", codigo.mensaje);
				}, 1500);
			} else {
				setTimeout(function () {
					presentAlert("AGREGAR GASTO", "ERROR", codigo.mensaje);
				}, 1500);
			}
			//dqs("pAgregarGto").innerHTML = codigo.mensaje;
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("AGREGAR GASTO", "ERROR", "Error");
			}, 1500);
		});
}

function cargarRubroGastos() {
	let apikey = localStorage.getItem("apikey");

	fetch(`${URLBASE}/rubros.php`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
	})
		.then(function (response) {
			if (response.status != 200) {
				dqs("pAgregarGto").innerHTML = response.statusText;
			} else {
				return response.json();
			}
		})
		.then(function (dataListaRubrosGastos) {
			console.log(dataListaRubrosGastos);

			dqs("slcRubroGasto").innerHTML = ``;

			for (let rubroG of dataListaRubrosGastos.rubros) {
				if (rubroG.tipo == "gasto") {
					dqs(
						"slcRubroGasto"
					).innerHTML += `<ion-select-option value="${rubroG.id}">${rubroG.nombre}</ion-select-option>`;
				}
			}
		})
		.catch(function (error) {
			console.log(error);
			dqs("pAgregarGto").innerHTML = "Error";
		});
}
//#endregion

//#region AgregarIngreso
function limpiarCamposING() {
	dqs("txtConceptoIngreso").value = ``;
	dqs("slcRubroIngreso").value = ``;
	dqs("txtTotalIngreso").value = ``;
	dqs("slcMedioIngreso").value = ``;
	dqs("fechaIngreso").value = ``;
	dqs("pAgregarIng").innerHTML = ``;
}

function tomarDatosAgregarIngreso() {
	let idUsu = Number(localStorage.getItem("id"));
	let co = document.querySelector("#txtConceptoIngreso").value;
	let ca = Number(document.querySelector("#slcRubroIngreso").value);
	let t = Number(document.querySelector("#txtTotalIngreso").value);
	let m = document.querySelector("#slcMedioIngreso").value;
	let fechaCompleta = document.querySelector("#fechaIngreso").value;
	let f = fechaCompleta.slice(0, 10);

	if (co == "" || ca == NaN || t == NaN || m == "" || f == "") {
		mostrarLoader("Cargando...", 1000, true, "dots");
		setTimeout(function () {
			presentAlert("AGREGAR INGRESO", "ERROR", "Faltan datos");
		}, 1500);
		//dqs("pAgregarIng").innerHTML = "Faltan datos";
	} else {
		let i = new IngresoDTO(idUsu, co, ca, t, m, f);
		agregarIngreso(i);
		mostrarLoader("Agregando movimiento...", 1000, true, "dots");
	}
}

function agregarIngreso(unIngreso) {
	limpiarCamposING();
	let apikey = localStorage.getItem("apikey");

	fetch(`${URLBASE}/movimientos.php`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
		body: JSON.stringify(unIngreso),
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (codigo) {
			console.log(codigo);

			if (codigo.codigo == 200) {
				setTimeout(function () {
					presentAlert("AGREGAR INGRESO", "EXITOSO", codigo.mensaje);
				}, 1500);
			} else {
				setTimeout(function () {
					presentAlert("AGREGAR INGRESO", "ERROR", codigo.mensaje);
				}, 1500);
			}
			//dqs("pAgregarIng").innerHTML = codigo.mensaje;
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("AGREGAR INGRESO", "ERROR", "Error");
			}, 1500);
		});
}

function cargarRubroIngresos() {
	let apikey = localStorage.getItem("apikey");

	fetch(`${URLBASE}/rubros.php`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
	})
		.then(function (response) {
			if (response.status != 200) {
				dqs("pAgregarIng").innerHTML = response.statusText;
			} else {
				return response.json();
			}
		})
		.then(function (dataListaRubrosIngresos) {
			console.log(dataListaRubrosIngresos);

			dqs("slcRubroIngreso").innerHTML = ``;

			for (let rubroI of dataListaRubrosIngresos.rubros) {
				if (rubroI.tipo == "ingreso") {
					dqs(
						"slcRubroIngreso"
					).innerHTML += `<ion-select-option value="${rubroI.id}">${rubroI.nombre}</ion-select-option>`;
				}
			}
		})
		.catch(function (error) {
			console.log(error);
			dqs("pAgregarIng").innerHTML = "Error";
		});
}
//#endregion

//#region listarMovimientos
function listarMovimientos() {
	mostrarLoader("Cargando...", 1000, true, "dots");
	let apikey = localStorage.getItem("apikey");
	let idUsu = localStorage.getItem("id");

	dqs("listadoMovGastos").innerHTML = ``;
	dqs("listadoMovIngresos").innerHTML = ``;

	fetch(`${URLBASE}/movimientos.php?idUsuario=${idUsu}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (codigo) {
			if (codigo.movimientos.length > 0) {
				for (let mov of codigo.movimientos) {
					if (mov.categoria > 0 && mov.categoria < 7) {
						dqs("listadoMovGastos").innerHTML += `<ion-item-sliding>
																<ion-item button id="resumen-${mov.id}" detail="true" detail-icon="caret-forward-outline" color="light" onclick="mostrarInfo(${mov.id});cambiarFlechita(${mov.id})">
																	<ion-label>
																		<h3>${mov.concepto}</h3>
																		<p>$${mov.total}</p>
																	</ion-label>
																</ion-item>

																<ion-item-options side="end">
																	<ion-item-option color="danger" onclick="borrarMov(${mov.id});setTimeout(function(){listarMovimientos()}, 1000)">
																		<ion-icon slot="icon-only" name="trash"></ion-icon>
																	</ion-item-option>
																</ion-item-options>
															</ion-item-sliding>

															<ion-item id="info-${mov.id}" class="ion-hide">
																<ion-text class="ion-padding">
																	<ion-label>
																		<h3>Id</h3>
																		<p>${mov.id}</p>
																		<h3>Medio</h3>
																		<p>${mov.medio}</p>
																		<h3>Categoría</h3>
																		<p>${mov.categoria}</p>
																		<h3>Total</h3>
																		<p>$${mov.total}</p>
																		<h3>Fecha</h3>
																		<p>${mov.fecha}</p>															
																	</ion-label>
                        										</ion-text>
															</ion-item>`;
					}
					if (mov.categoria >= 7) {
						dqs("listadoMovIngresos").innerHTML += `<ion-item-sliding>
																<ion-item button id="resumen-${mov.id}" detail="true" detail-icon="caret-forward-outline" color="light" onclick="mostrarInfo(${mov.id});cambiarFlechita(${mov.id})">
																	<ion-label>
																		<h3>${mov.concepto}</h3>
																		<p>$${mov.total}</p>
																	</ion-label>
																</ion-item>

																<ion-item-options side="end">
																	<ion-item-option color="danger" onclick="borrarMov(${mov.id});setTimeout(function(){listarMovimientos()}, 1000)">
																		<ion-icon slot="icon-only" name="trash"></ion-icon>
																	</ion-item-option>
																</ion-item-options>
															</ion-item-sliding>

															<ion-item id="info-${mov.id}" class="ion-hide">
																<ion-text class="ion-padding">
																	<ion-label>
																		<h3>Id</h3>
																		<p>${mov.id}</p>
																		<h3>Medio</h3>
																		<p>${mov.medio}</p>
																		<h3>Categoría</h3>
																		<p>${mov.categoria}</p>
																		<h3>Total</h3>
																		<p>$${mov.total}</p>
																		<h3>Fecha</h3>
																		<p>${mov.fecha}</p>															
																	</ion-label>
                        										</ion-text>
															</ion-item>`;
					}
				}
			} else {
				dqs("pListadoGas").innerHTML = "No se registraron gastos.";
				dqs("pListadoIng").innerHTML = "No se registraron ingresos.";
			}
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("LISTADO", "ERROR", "Error");
			}, 1500);
		});
}

function borrarMov(idMov) {
	let apikey = localStorage.getItem("apikey");

	dqs("pListadoMov").innerHTML = ``;

	fetch(`${URLBASE}/movimientos.php`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},

		body: JSON.stringify({ idMovimiento: `${idMov}` }),
		// Expected output: "{"idMovimiento":5678}",
	})
		.then(function (response) {
			console.log(response);

			return response.json();
		})
		.then(function (codigo) {
			console.log(codigo);

			let msg = codigo.mensaje;

			if (codigo.codigo == 200) {
				setTimeout(function () {
					presentAlert("BORRAR", "EXITOSO", msg);
				}, 1500);
			} else {
				setTimeout(function () {
					presentAlert("BORRAR", "ERROR", msg);
				}, 1500);
			}
			//dqs("pListadoMov").innerHTML = msg;
		})
		.catch(function (error) {
			console.log(error);
			setTimeout(function () {
				presentAlert("BORRAR", "ERROR", "Error");
			}, 1500);
			//dqs("pListadoMov").innerHTML = "Error";
		});
}

function mostrarInfo(movId) {
	//Si tiene la clase ion-hide la saca y si no la tiene la pone
	dqs(`info-${movId}`).classList.toggle("ion-hide");
}

function cambiarFlechita(movId) {
	let detailIcon = dqs(`resumen-${movId}`);
	let detailIconValue = dqs(`resumen-${movId}`).getAttribute("detail-icon");

	if (detailIconValue == "caret-forward-outline") {
		detailIcon.setAttribute("detail-icon", "caret-up-outline");
	} else {
		detailIcon.setAttribute("detail-icon", "caret-forward-outline");
	}
}
//#endregion

//#region montosTotales
function montosTotales() {
	mostrarLoader("Cargando...", 1000, true, "dots");
	let apikey = localStorage.getItem("apikey");
	let idUsu = localStorage.getItem("id");

	dqs("totalGastos").innerHTML = ``;
	dqs("totalIngresos").innerHTML = ``;
	dqs("totalSaldo").innerHTML = ``;

	fetch(`${URLBASE}/movimientos.php?idUsuario=${idUsu}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (codigo) {
			let totalGastos = 0;
			let totalIngresos = 0;
			let totalSaldo = 0;

			for (let mov of codigo.movimientos) {
				if (mov.categoria > 0 && mov.categoria < 7) {
					console.log(mov.total);
					totalGastos += mov.total;
				} else {
					totalIngresos += mov.total;
				}
			}

			dqs("totalGastos").innerHTML = totalGastos;
			dqs("totalIngresos").innerHTML = totalIngresos;

			totalSaldo = totalIngresos - totalGastos;

			cambiarColorSaldo(totalSaldo);

			dqs("totalSaldo").innerHTML = totalSaldo;
		});
}

function cambiarColorSaldo(unNumSaldo) {
	let totalSaldoNumero = dqs("totalSaldo");

	if (unNumSaldo > 0) {
		totalSaldoNumero.style.color = "#2dd36f";
	} else {
		totalSaldoNumero.style.color = "#eb445a";
	}
}

//#region crearMapa
var map = undefined;
function crearMapa() {
	if (map != undefined) {
		map.remove();
	}

	map = L.map("map").setView([lat, long], 16); //centro del mapa en El Obelisco

	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		// Atributos
		maxZoom: 17,
		minZoom: 2,
	}).addTo(map);

	let apikey = localStorage.getItem("apikey");

	fetch(`${URLBASE}/cajeros.php`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			apikey: apikey,
		},
	})
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (codigo) {
			let marcador = null;
			console.log(codigo.cajeros);
			for (let cajero of codigo.cajeros) {
				if (cajero.disponible == 1 && cajero.latitud != 0) {
					marcador += L.marker([`${cajero.latitud}`, `${cajero.longitud}`])
						.addTo(map)
						.bindPopup(`Tiene dinero disponible ${chequearDepositos(cajero)}`);
				}
			}

			//Marcar un área con un círculo
			let centroCirculo = L.marker([lat, long])
				.addTo(map)
				.bindPopup("<strong>Usted está aquí.</strong>")
				.openPopup();

			//Circulo
			var circulo = L.circle([lat, long], {
				colo: "red",
				fillColor: "#f03",
				fillOpacity: 0.2,
				radius: 300, //metros
			}).addTo(map);
		});
}

function chequearDepositos(unCajero) {
	if (unCajero.depositos == 1) {
		return "Acepta depósitos";
	} else {
		return "No acepta depósitos";
	}
}
//#endregion

//#region CompartirApp
function compartir() {
	Capacitor.Plugins.Share.share({
		title: `Compartir que me gustó`,
		text: `¡Descargala!`,
		url: "https://dwallet.develotion.com/site/",
		dialogTitle: "¡Gracias!",
	});
}
//#endregion

//#region Loaders y alerts
const loading = document.createElement("ion-loading");
function mostrarLoader(msg, duracion, opacidad, tipoSpinner) {
	loading.spinner = tipoSpinner;
	loading.duration = duracion;
	loading.message = msg;
	loading.translucent = opacidad;
	loading.cssClass = "custom-class custom-loading";

	document.body.appendChild(loading);
	return loading.present();
}

const alert = document.createElement("ion-alert");
function presentAlert(header, subHeader, msg) {
	alert.header = header;
	alert.subHeader = subHeader;
	alert.message = msg;
	alert.cssClass = "custom-alert";
	alert.buttons = [{ text: "OK", cssClass: "alert-button-confirm" }];

	document.body.appendChild(alert);
	alert.present();
}
//#endregion
