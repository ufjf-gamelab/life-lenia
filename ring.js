
export function createRingKernel(R) {
    const size = 2 * R + 1;  //cria kernel simetrico em torno do centro
    const K = Array.from({length: size}, () => Array(size).fill(0));  //matriz k preenchida com 0
    
    for (let y = -R; y <= R; y++) {  //todas as posições dentro do quadrado kernel
      for (let x = -R; x <= R; x++) {
        if (x * x + y * y <= R * R && !(x === 0 && y === 0)) {  //x² + y² verifica  se a celula está dentro do raio  e exclui a célula central (atual)
          K[y + R][x + R] = 1;  //posições válidas viram 1
        }
      }
    }
  
    const soma = K.flat().reduce((acc, val) => acc + val, 0);  //transfoma matriz em array unidimensional e soma valores
    return K.map(row => row.map(val => val / soma));  //normalizar kernel para preservar a quant total de influência, mantendo proporção relativa. evita distorção
  }
  

  //função para contar vizinhos

  //atualizar matriz