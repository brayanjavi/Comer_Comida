    var puntaje = 0;
    var nObjetos = 5;
    var personaje = document.getElementById('obj');
    var posicionX = 0;
    var posicionY = 0;
    var velocidad = 50;
    var velocidadBasura = 10;
    var direccion = "derecha";
    var intervalo;
    var tecla = "";    
    var teclaPulsada = false; 
    // -- Dimensiones de pantalla
    var ancho = window.innerWidth;
    var alto = window.innerHeight;
  

lluvia();
// -- precionar teclas
document.onkeydown = function(e)
{        
    tecla = e.keyCode;
    teclaPulsada = true;
    // -- si es flecha derecha
    if (tecla == 39) {
        // -- mover personaje a la derecha
        personaje.style.transform = "scaleX(1)";
        direccion = "derecha";
        // --- Flecha Izquierda
    }else if (tecla == 37) {
        // -- voltear personaje
        personaje.style.transform = "scaleX(-1)";
        direccion = "izquierda";
    }else{
        return false;
    }
    moverPersonaje();
}

// -- mover personaje al pulsar flecha derecha o izquierda
function moverPersonaje() {

    if (direccion == "derecha") {
        posicionX += velocidad;
    } else {
        posicionX -= velocidad;
    }
    personaje.style.left = posicionX + "px";
    verificarLimites();
}

// -- verificar que no salga perosnaje de pantalla
function verificarLimites() {
    if (posicionX > window.innerWidth - personaje.width) {
        posicionX = window.innerWidth - personaje.width;
    } else if (posicionX < 0) {
        posicionX = 0;
    }
}

// -- Lluvia de objetos
function lluvia() {
    
    intervalo = setInterval(function() {
        nObjetos--;
        if(nObjetos >= 0){
            crearBasura();
        }else{
            clearInterval(intervalo);
        }
    }, 1000);        
          
}

// -- mover objeto
function moverObjeto(objeto) {        
    var posicionY = 0;        
    var direccion = "derecha";
    var intervalo;
    var tecla = "";    
    var teclaPulsada = false; 
    var limite = window.innerHeight - objeto.height;                
    intervalo = setInterval(function() {
        // -- bajar objeto
        posicionY += velocidadBasura;
        objeto.style.top = posicionY + "px";
        // -- verificar limite
        if (posicionY > limite) {
            posicionY = 0;
            objeto.style.top = posicionY + "px";
        }                    

        // -- saber si el objeto toca a personaje
        if (objeto.offsetTop + objeto.height > personaje.offsetTop && objeto.offsetTop < personaje.offsetTop + personaje.height && objeto.offsetLeft + objeto.width > personaje.offsetLeft && objeto.offsetLeft < personaje.offsetLeft + personaje.width) {
            // -- eliminar objeto
            document.body.removeChild(objeto);
            puntaje++;
            // -- reiniciar intervalo
            if(puntaje == 5){                                
                alert("Ganaste");                      
                clearInterval(intervalo);                    
            }else{
                lluvia();
                clearInterval(intervalo);
            }                
        }
        
    }, 50);                
}

function crearBasura() {
    // -- numero aleatorio menor al anchoro de pantalla
    var posicionX = Math.floor(Math.random() * (ancho - 100));
    var objeto = document.createElement("img");
    objeto.src = "recursos/R.png";
    objeto.style.position = "absolute";
    objeto.style.width = "10%";
    objeto.style.height = "10%";
    objeto.style.top = "0";
    objeto.style.left = posicionX + "px";
    objeto.style.zIndex = "2";
    document.body.appendChild(objeto);
    moverObjeto(objeto);
}