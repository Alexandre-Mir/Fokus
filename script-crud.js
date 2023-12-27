// Seleção de elementos HTML
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');


// Recuperação de tarefas salvas no localStorage
let listaTarefas = JSON.parse(localStorage.getItem('listaTarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

// Salvamento das tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

// Limpeza da área de texto e ocultação do formulário
function limparTexto() {
  textArea.value = '';
  formAdicionarTarefa.classList.add('hidden');
}

// Função para criar elemento de tarefa
function criarElementoTarefa(tarefa) {
  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item');

  // Criação do ícone da tarefa
  const svg = document.createElement('svg');
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;

  // Criação do parágrafo com a descrição da tarefa
  const paragrafo = document.createElement('p');
  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add('app__section-task-list-item-description');

  // Criação do botão de edição da tarefa
  const botao = document.createElement('button');
  botao.classList.add('app_button-edit');
  
  const imagemBotao = document.createElement('img');
  imagemBotao.src = '/imagens/edit.png';

  botao.append(imagemBotao);

  // Clicar no botão para editar o nome da tarefa
  botao.onclick = ()=> {
    // pergunta e armazena novo nome da tarefa
    const novaDescricao = prompt("Reescreva o nome da tarefa.");
    // Não permite alteração que não contenha nada
    if (novaDescricao) {
      // altera visualmente o nome
      paragrafo.textContent = novaDescricao;
      // altera o nome na localStorage
      tarefa.descricao = novaDescricao;
      salvarTarefas();
    }
  }

  // Adição dos elementos criados ao elemento li
  li.append(paragrafo);
  li.append(svg);
  li.append(botao);

  if (tarefa.completa) {
    li.classList.add('app__section-task-list-item-complete');
    botao.setAttribute('disabled', 'disabled');
  } else {
    li.onclick = () => {
      document.querySelectorAll('.app__section-task-list-item-active').forEach(elemento => {
        elemento.classList.remove('app__section-task-list-item-active');
      })
      if (tarefaSelecionada == tarefa) {
        paragrafoDescricaoTarefa.textContent = '';
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return
      }
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      paragrafoDescricaoTarefa.textContent = tarefa.descricao;
      li.classList.add('app__section-task-list-item-active');
    }
  }


  return li;

}

// Event Listener para exibir/esconder formulário
btnAdicionarTarefa.addEventListener('click', () => {
  formAdicionarTarefa.classList.toggle('hidden');
})

// evento Listener para adicionar tarefa
formAdicionarTarefa.addEventListener('submit', (evento) => {
  evento.preventDefault();
  
  // Criação de um objeto tarefa com base no valor da área de texto
  const tarefa = {
    descricao: textArea.value
  }
  // Adição da tarefa ao array de tarefas
  listaTarefas.push(tarefa);

  // Criação do elemento visual da tarefa e adição à ul de tarefas
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  
  // Salvamento das tarefas no localStorage
  salvarTarefas();

  // Limpeza da área de texto e ocultação do formulário
  limparTexto();
})

// Criação de elementos de tarefa para tarefas existentes
listaTarefas.forEach(tarefa => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});

btnCancelar.addEventListener('click', limparTexto);

document.addEventListener('FocoFinalizado', () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
    tarefaSelecionada.completa = true;
    salvarTarefas();
  }
})

const removerTarefas = (somenteCompletas) => { 
  let seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';

  document.querySelectorAll(seletor).forEach( elemento => elemento.remove());
  listaTarefas = somenteCompletas ? listaTarefas.filter(tarefa => !tarefa.completa) : [];
  console.log("Tarefas removidas com sucesso!");
  salvarTarefas();
}
btnRemoverConcluidas.onclick = () => removerTarefas();

btnRemoverTodas.onclick = () => {
  const confirmacao = window.confirm("Tem certeza de que deseja remover todas as tarefas?");
  if (confirmacao) {
    removerTarefas(false);
  }
};