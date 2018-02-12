String.prototype.transformaCaracteresEspeciales = function() {
return unescape(escape(this).
    	replace(/%0A/g, '<br/>').
      	replace(/%3C/g, '&lt;').
    	replace(/%3E/g, '&gt;'));
}

document.addEventListener("DOMContentLoaded", function() {

	let listaEstadoAjax = document.getElementById("estadoAjax");
	let estadoServidor = document.getElementById("estadoServidor");

	function loadDoc() {
		listaEstadoAjax.innerHTML = "";
		let url = document.getElementById("url").value;
		let xhttp = new XMLHttpRequest();
		if (xhttp.readyState == 0) {
				let elemento = document.createElement("li");
				let texto =  document.createTextNode("0. no iniciado");
				elemento.appendChild(texto);
				listaEstadoAjax.appendChild(elemento);
		}
		xhttp.onreadystatechange = function() {
			if (this.readyState == 1) {
				let elemento = document.createElement("li");
				let texto =  document.createTextNode("1. leyendo");
				elemento.appendChild(texto);
				listaEstadoAjax.appendChild(elemento);
			}

			if (this.readyState == 2) {
				let elemento = document.createElement("li");
				let texto =  document.createTextNode("2. leido");
				elemento.appendChild(texto);
				listaEstadoAjax.appendChild(elemento);
			}

			if (this.readyState == 3) {
				let elemento = document.createElement("li");
				let texto =  document.createTextNode("3. interactiva");
				elemento.appendChild(texto);
				listaEstadoAjax.appendChild(elemento);
			}

			if (this.readyState == 4 && this.status == 200) {
				let elemento = document.createElement("li");
				let texto =  document.createTextNode("4. completo");
				elemento.appendChild(texto);
				listaEstadoAjax.appendChild(elemento);

				document.getElementById("contenidoFichero").innerHTML = this.responseText.transformaCaracteresEspeciales();

				estadoServidor.innerHTML = "Estado del servidor: "+ this.status + " "+ this.statusText;
			}else{
				document.getElementById("contenidoFichero").innerHTML = "";
				estadoServidor.innerHTML = "Estado del servidor: "+ this.status + " "+ this.statusText;
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}

	document.getElementById("mostrar").addEventListener("click", loadDoc);
});