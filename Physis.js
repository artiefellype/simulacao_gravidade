
const _MASSA_TERRA = 2000
const _MASSA_BOLA = 1
const _CONSTANTE_GRAVITACIONAL = 9.8


let widthScreen = 800
let heightScreen = 800

//Posicoes iniciais
let ballPosition = { 
    x: 400,
    y: 35
}

const earthPosition = {
    x: (widthScreen/2) - 300,
    y: (heightScreen/2) - 300
}

// Definindo elementos da tela
// -------------------------------------------------------
const canvas = document.getElementsByClassName('cannon')[0]
canvas.style.border = "1px #2A2A2A solid"
canvas.style.width= `${widthScreen}px`
canvas.style.height = `${heightScreen}px`

const earth = document.getElementById("earth")
earth.style.width = "600px"
earth.style.height = "600px"
earth.style.zIndex = "0"
earth.style.background = "#2a2a2a"
earth.style.borderRadius = '480px'
earth.style.position = 'absolute'
earth.style.left = `${earthPosition.x}px`
earth.style.top = `${earthPosition.y}px`


const ball = document.getElementById('ball')
ball.style.width = '15px'
ball.style.height = '15px'
ball.style.zIndex = "1"
ball.style.borderRadius = '20px'
ball.style.background = 'red'
ball.style.position = 'absolute'
ball.style.left = `${ballPosition.x}px`
ball.style.top = `${ballPosition.y}px`
ball.style.transition = ".2s ease"
// -------------------------------------------------------

    // velocidadeX = 7 para entrar em órbita
    let velocidadeX = 7
    let velocidadeY = 0
    let aclX = 0.00
    let aclY = 0.0

let throwBall = 
       setInterval(()=>{
         
        velocidadeX = velocidadeX + aclX
        velocidadeY = velocidadeY + aclY

        ballPosition.x = ballPosition.x + velocidadeX
        ballPosition.y = ballPosition.y + velocidadeY

        //Aplicando a velocidade na posicao do objeto menor dando a ele movimento
        ball.style.left = `${ballPosition.x}px`
        ball.style.top = `${ballPosition.y}px`

        /* Distancia obtida por meio do teorema de pitagoras onde o quadrado da
        hipotenusa é igual ao quadrado da soma dos catetos
        Onde a hipotenusa seria a distancia entre os dois pontos (objeto de maior massa e objeto de menor massa) */
        let distancia = Math.sqrt((Math.pow( ballPosition.x - (earthPosition.x + 300), 2)) + (Math.pow( ballPosition.y - (earthPosition.y + 300), 2)))
        //seno obtido por sen0 = (Yb - Ya)/hipotenusa
        let sen = ((earthPosition.y + 300) - ballPosition.y ) / distancia
        //cosseno obtido por cos0 = (Xb - Xa)/hipotenusa
        let cos = ( (earthPosition.x + 300) - ballPosition.x) / distancia
        //Forca obtida por F=G*((Ma x Mb)/ d x d)
        let forca = _CONSTANTE_GRAVITACIONAL * ((_MASSA_BOLA * _MASSA_TERRA) / (distancia * distancia))
        // Realizando a decomposicao de vetores para obtermos as forcas horizontais e verticais
        let forcaX = forca * cos
        let forcaY = forca * sen


        /*De acordo com o principio fundamental da dinamica a aceleracao adquirida por um
        corpo e diretamente proporcional a resultante das forcas que agem sobre ele */
        aclX = forcaX/_MASSA_BOLA
        aclY = forcaY/_MASSA_BOLA

        /* No momento em que a distancia se torna menor que o raio do objeto maior
        o objeto menor e parado, simulando uma colisao da forma mais simples */
        if(distancia < 300){
            forcaX = 0
            forcaY = 0
            velocidadeX =  0
            velocidadeY = 0
        }  

       }, 50)



