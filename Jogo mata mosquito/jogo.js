var altura = 0
var largura = 0
var vidas = 1
var tempo = 40

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')
if(nivel === 'facil') {
    criaMosquitoTempo = 1500
    console.log(criaMosquitoTempo)
} else if(nivel === 'normal') {
    criaMosquitoTempo = 1000
    console.log(criaMosquitoTempo)
} else if(nivel === 'dificil') {
    criaMosquitoTempo = 750
    console.log(criaMosquitoTempo)
}

function definirPalcoJogo(){

    altura = window.innerHeight
    largura = window.innerWidth

}

var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = "vitoria.html"
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

definirPalcoJogo()

function posicoesRandomicas(){

    // Remover o mosquito que já existe na cena

    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){
             window.location.href = "fim_de_jogo.html"
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++
        }
    }


    // Posições Randomicas

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // Cria elementos HTML

    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)

}

function tamanhoRandomico() {

    var classe = Math.floor(Math.random() * 3) + 1

    switch(classe){
        case 1:
            return 'mosquito1'

        case 2:
            return 'mosquito2'

        case 3:
            return 'mosquito3'
    }

}

function ladoRandomico() {

    var lado = Math.floor(Math.random() * 2) + 1

    switch(lado){
        case 1:
            return 'ladoA'

        case 2:
            return 'ladoB'

    }

}

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value

    if(nivel === ''){
        alert('Selecione um nível para iniciar o jogo')
        return false
    }

    window.location.href = "app.html?" + nivel
}