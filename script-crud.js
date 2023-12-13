// Seleção de elementos HTML
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

// Recuperação de tarefas salvas no localStorage
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

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
    const novaDescricao = prompt("Reescreva o nome da tarefa.");
    paragrafo.textContent = novaDescricao;
  }

  // Adição dos elementos criados ao elemento li
  li.append(paragrafo);
  li.append(svg);
  li.append(botao);

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
  tarefas.push(tarefa);

  // Criação do elemento visual da tarefa e adição à lista de tarefas
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  
  // Salvamento das tarefas no localStorage
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  // Limpeza da área de texto e ocultação do formulário
  textArea.value = '';
  formAdicionarTarefa.classList.add('hidden');
})

// Criação de elementos de tarefa para tarefas existentes
tarefas.forEach(tarefa => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});