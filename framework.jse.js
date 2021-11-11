    
/* ------------
    *COLORES* 
    ----------- */
//#region Funciones para recuperar el color    
const COLORES = [
    {id : 'naranja100' , name: '#fbe7c6'},    
    {id : 'naranja110' , name: '#f7e0bc'},
    {id : 'naranja120' , name: '#fdd9a0'},
    {id : 'naranja130' , name: '#ffd797'},
    {id : 'naranja140' , name: '#ffd48f'},
    {id : 'naranja250' , name: '#F8EA8C'},    
    {id : 'blanco100' , name: '#fff'},   
    {id : 'blanco200' , name: '#f0f0f0'},
    {id : 'blanco300' , name: '#EEEDE7'},
    {id : 'marron100' , name: '#E7D2CC'},
    {id : 'gris100' , name: '#eee'},
    {id : 'gris200' , name: '#B9B7BD'},
    {id : 'gris300' , name: '#afadb3'},
    {id : 'gris400' , name: '#86cB8E'},
    {id : 'negro' , name: '#000'}
]; 
function convertArrayToObject(array) {
    return array.reduce(function (obj, item) { 
        obj[item.id] = item; 
        return obj; 
    }, {});
}

const dColores = convertArrayToObject(COLORES);

function getColor (tipo, clases){ 
    let color;       
    Array.prototype.forEach.call(clases, clase =>{       
        if(clase.includes(tipo)){ 
            //console.log(clase);
            if(clase.includes('#')){
                color = {id:`#${clase.split('#')[1]}`,name:`#${clase.split('#')[1]}`};
            }else{
               color = dColores[clase.split('_')[1]];  
            } 
            //console.log(color);
        }
    });   
    if(!color){  
        if(tipo == 'col')
            color = dColores['negro'];
        else
            color = dColores['blanco100'];
    }
    return color;
} 
//#endregion  