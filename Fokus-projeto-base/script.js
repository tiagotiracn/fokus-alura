const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document. querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImagem = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


//exercicio aula1
const timer = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const start_pause = document.querySelector('.app__card-primary-button');

const focoBt_valor = 1500;
const curtoBt_valor = 300;
const longoBt_valor = 900;

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3')


let tempoDecorridoemSegundos = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener ('change', () => {
    if (musica.paused){
        musica.play()
    }

    else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto){
        case 'foco':
            titulo.innerHTML=`
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                tempoDecorridoemSegundos = 1500
                mostrarTempo()
        break;

        case 'descanso-curto': 
            titulo.innerHTML= `
                Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
                `
            tempoDecorridoemSegundos = 300
            mostrarTempo()
        break;

        case 'descanso-longo':
            titulo.innerHTML=`
                Hora de voltar à superfície.<br> 
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
                tempoDecorridoemSegundos = 900
                mostrarTempo()
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoemSegundos <= 0) {
        //audioTempoFinalizado.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoemSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarImagem.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarImagem.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
