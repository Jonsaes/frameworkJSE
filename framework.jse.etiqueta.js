
//#region Principal (configuración base cuando se carga/recarga la página)
const etiquetas = document.getElementsByClassName('etiqueta');
Array.prototype.forEach.call(etiquetas, etiqueta =>{     
    Array.prototype.forEach.call(etiqueta.classList, clase =>{            
        let cls = clase.split('_');        
        switch(cls[0]){
            case 'wmin':                 
                etiqueta.style.width = cls[1]; 
                break;
            case 'height':                 
                etiqueta.style.height = cls[1];
                etiqueta.style.setProperty('padding',`calc(${cls[1]}*.50 - 1em*0.55) 0.2em 0 0.2em`);                  
                break;
            case 'col':                
                color = getColor('bac', etiqueta.classList).name;                
                etiqueta.style.color = color;
                break;
            case 'bac':                
                color = getColor('bac', etiqueta.classList).name;                
                etiqueta.style.background = color;
                break;
            case 'top':       
                etiqueta.style.setProperty('top', getPosition(cls,etiqueta));               
                break;
            case 'bottom':       
                etiqueta.style.setProperty('bottom', getPosition(cls,etiqueta));               
                break;
            case 'right':                
                etiqueta.style.setProperty('right', getPosition(cls, etiqueta)); 
                break;
            case 'left':               
                etiqueta.style.setProperty('left', getPosition(cls, etiqueta));
                               
                break;
            case 'text':
                if(cls[1]=='L'){
                    etiqueta.style.textAlign= 'left'; 
                }else if(cls[1]=='R'){
                    etiqueta.style.textAlign= 'right';
                }else{
                    etiqueta.style.textAlign= 'center';
                }
                break;
            case 'round':
                
            case 'roundL':                
            case 'roundR':
                etiqueta.style.textAlign = 'right';
                let arrayCls = rounded(cls);
                if(arrayCls){
                    etiqueta.style.borderTopLeftRadius = arrayCls[0];
                    etiqueta.style.borderTopRightRadius = arrayCls[1];
                    etiqueta.style.borderBottomRightRadius = arrayCls[2];
                    etiqueta.style.borderBottomLeftRadius = arrayCls[3];
                }
                break;
            case 'opacity':
                //console.log(cls[1]*0.01);
                etiqueta.style.opacity = cls[1]*0.01;
                break;
        }        
        if(clase.includes('--hover')){            
            etiqueta.addEventListener("mouseenter", function(){etiquetaEnter(etiqueta,clase);});
            etiqueta.addEventListener("mouseleave", function(){etiquetaLeave(etiqueta,clase);}); 
        }else if(clase.includes('--click')){
            
            etiqueta.addEventListener("click", function(){etiquetaClick(etiqueta,clase);}); 
        }else if(clase.includes('--fixed')){
            etiquetaOpen(etiqueta);
        }       
    }); 
 });
//#endregion

/** Redondea la etiqueta por la derecha, por la izquierda o por los 2 lados */
function rounded(cls){
    let retorno;
    if(cls[0].includes('L')){
        retorno = [cls[1],0,0,cls[1]];
    }
    else if (cls[0].includes('R')){
        retorno = [0,cls[1],cls[1],0];
    }else{
        retorno = [cls[1],cls[1],cls[1],cls[1]];
    }    
    return retorno
}
/**Obtenemos el valor de la posción de los parametros TOP, BOTTOM, LEFT o RIGHT*/
function getPosition(valor, etiqueta){
    let retorno = 0;
    let hei = 0;
    Array.prototype.forEach.call(etiqueta.classList, clase =>{
        if(clase.includes('height')){
            hei = clase.split('_')[1];           
        }
    });    
    if(valor[1]){       
        switch(valor[0]){
            case 'left': 
            case 'right':               
                retorno = valor[1];                          
                break;
            case 'top':
                console.log(valor);
                if (valor[1].includes('up')){
                    retorno = 0;
                }else if(valor.includes('down')){       
                    retorno = `calc(100% - ${hei})`;
                }else if(valor.includes('middle')){ 
                    retorno = `calc(50% - ${hei}*0.5)`; 
                }else{                    
                    retorno = valor[1];
                }
                break;  
            case 'bottom':
                if (valor[1].includes('up')){
                    retorno = `calc(100% - ${hei})`;
                }else if(valor.includes('down')){       
                    retorno = 0;
                }else if(valor.includes('middle')){ 
                    retorno = `calc(50% - ${hei}*0.5)`; 
                }else{
                    retorno = valor;
                }
                break;
        }
    }
    else{        
        retorno = 0;
    } 
    return retorno;
}
/**  Abrir etiqueta*/
function etiquetaOpen(elemento){    
    let clases = elemento.classList;   
    Array.prototype.forEach.call(clases, clase =>{   
        if(clase.includes('wmax')){             
            elemento.style.color = getColor('col', clases).name;
            elemento.style.background = getColor('bac', clases).name;
            elemento.style.width = clase.split('_')[1];
        }
    });  
}
/**  Cerrar etiqueta */
function etiquetaClose(elemento){
    let clases = elemento.classList;   
    Array.prototype.forEach.call(clases, clase =>{   
        if(clase.includes('wmin')){             
            elemento.style.color = getColor('bac', clases).name;            
            elemento.style.width = clase.split('_')[1];           
        }
    });   
}
//#region Eventos definidos para 'Hover' y 'Click'
function etiquetaEnter(etiqueta, clase){ 
    etiquetaOpen(etiqueta);    
    if(clase.includes('=')){
        let funcion = clase.split('=')[1];
        if(funcion){
            try{
                 self[funcion]();
            }catch{
                console.log('La función no está declarada en ningún archivo javascript.')
            }           
        }else{
            console.log(`La función no está definida en la etiqueta: '${clase}'`);
            console.log(etiqueta);
        }
    }
}
function etiquetaLeave(etiqueta,clase){ 
    etiquetaClose(etiqueta); 
}
function etiquetaClick(etiqueta, clase){   
    
    if(etiqueta.style.color === etiqueta.style.backgroundColor){
        console.log("ENTER");
        etiquetaEnter(etiqueta,clase);
    }else{
        console.log("LEAVE");
         etiquetaLeave(etiqueta,clase);
    }       
}
//#endregion



