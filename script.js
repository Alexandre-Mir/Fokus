const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.getElementById('timer');

const musicaFoco = new Audio('sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somAlerta = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 10; //1500
let intervaloId = null;

musicaFoco.loop = true;
somPlay.volume = 0.1;
somPause.volume = 0.2;
somAlerta.volume = 0.2;


musicaFocoInput.addEventListener('change', () => {
  if(musicaFoco.paused){
    musicaFoco.play();
  } else {
    musicaFoco.pause();
  };
});

focoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 300;
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=>{
  tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  longoBt.classList.add('active');
});

function alterarContexto(contexto){
  mostrarTempo();
  botoes.forEach(()=>{
    focoBt.classList.remove('active')
    curtoBt.classList.remove('active');
    longoBt.classList.remove('active');
  })
  html.setAttribute('data-contexto', contexto);
  banner.setAttribute('src', `imagens/${contexto}.png`)
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `
      Otimize sua produtividade,<br />
					<strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;
    case 'descanso-curto':
      titulo.innerHTML = `
      Que tal dar uma respirada?<br /> 
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `
      break;
    case 'descanso-longo':
      titulo.innerHTML = `
      Hora de voltar à superfície.<br /> 
      <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `
      break;
    default:
      break;
  }
};

const contagemRegressiva = () =>{
  if(tempoDecorridoEmSegundos <= 0){
    somAlerta.play();
    alert('Tempo finalizado');
    const focoAtivo = html.getAttribute('data-contexto') == 'foco';
    if (focoAtivo) {
      const evento = new CustomEvent('FocoFinalizado')
      document.dispatchEvent(evento);
    }
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
  if(intervaloId){
    somPause.play();
    zerar()
    return
  }
  somPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = 'Pausar';
  iniciarOuPausarIcon.setAttribute('src', `imagens/pause.png`)

}

function zerar (){
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = 'Começar'
  iniciarOuPausarIcon.setAttribute('src', `imagens/play_arrow.png`)
  intervaloId = null;

  // Reinicie o tempo para o valor inicial com base no contexto
  switch (html.getAttribute('data-contexto')) {
    case 'foco':
      tempoDecorridoEmSegundos = 1500;
      break;
    case 'descanso-curto':
      tempoDecorridoEmSegundos = 300;
      break;
    case 'descanso-longo':
      tempoDecorridoEmSegundos = 900;
      break;
    default:
      break;
  }
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
  tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()