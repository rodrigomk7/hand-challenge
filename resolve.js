const fs = require('fs');

const MAX = 255, MIN = 0;

const clamp = value =>{
    if(value > MAX) return MIN;
    if(value < MIN) return MAX;
    return value;
}

const getNext = (index, instruc) =>{
    let firts = 1;
    for( let y= index + 1 ; y < instruc.length; y++ ){
        if(instruc[y] === '🤜' ) firts++;
        if(instruc[y] ===  '🤛' ) firts--;
        if(firts === 0 ) return y;
    }
}

const getPrev = (index, instruc) =>{
    let firts = 1;
    for( let y= index - 1; y >= 0; y-- ){
        if(instruc[y] === '🤜' ) firts--;
        if(instruc[y] ===  '🤛' ) firts++;
        if(firts === 0 ) return y;
    }
}

//main
function translate (string){
    const data = [0];

    let pointer = 0;
    let output ='';
    let i = 0;

    const array = Array.from(string);

    //diccionary
    const actions = {
        '👉': () => {pointer++ 
                    data[pointer] ??= 0},
        '👈': () => {pointer--
                    data[pointer] ??= 0},
        '👆': () => data[pointer] = clamp(data[pointer] + 1),

        '👇': () => data[pointer] = clamp(data[pointer] - 1),

        '👊': () => output += String.fromCharCode(data[pointer]),

        '🤜': () => {
            if(data[pointer]===0){
              //  i = array.indexOf('🤛', i);
              i = getNext(i,array);
            }
        },
              
        '🤛': () => {
            if(data[pointer] !==0){
                //i =  array.lastIndexOf('🤜', i);
                i = getPrev(i,array);
            }
        }
      }

    for ( ; i < array.length; i++){
        const accion = array[i];
        actions[accion]();       
    }
    
    output = output.replace(/\n/g, "");
    return output;
}

module.exports = translate;