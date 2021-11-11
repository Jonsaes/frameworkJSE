function main(){
    // document.getElementById('leer')
    // .addEventListener('change', leerArchivo, false);  
}

function leerArchivo(e){ 
    let archivo = e.target.files[0];
    let nom = archivo.name;
    if (!archivo) {
        return;
    }
    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;
        mostrarContenido(contenido, nom);
    };
    lector.readAsText(archivo);
}

function mostrarContenido(contenido, nombre){    
    let nom = "Mensajes";
    let mensaje = document.getElementById('mensajes');
    let ulMensajes = document.getElementById('ulMensajes');
    let MensajePrincipal = new MensajesFazit(contenido);

    mensaje.innerHTML= `${nom} [${nombre}]`;
    for (let i=0;i<MensajePrincipal.ArrayMensajes.length;i++){
        ulMensajes.innerHTML = ulMensajes.innerHTML + crear_li(MensajePrincipal.ArrayMensajes[i].imprimir());
    }    
}

function crear_li(textoP){
    let contenido = `<div class="li">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle --cursor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                        <p  class="--cursor">${textoP}</p>
                    </div>`;
    return contenido;
}