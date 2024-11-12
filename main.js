const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 200;
// canvas.style.border = "1px solid black;"

document.body.append(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let TAM = 10;


for(let l=0; l<20; l++){
    for(let c=0; c<20; c++){
        if(Math.random()<0.3){
            desenhaQuadrado(l,c);
        }
    }
}


function desenhaQuadrado(linha, coluna){
    ctx.fillStyle = "red";
    ctx.fillRect(coluna*TAM, linha*TAM, TAM, TAM);
}

