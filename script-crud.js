// Selecionando os elementos que vamos interagir no nosso código.

// Botão de adicionar tarefa baseado na classe CSS.
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');

// Formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

// Área de texto onde o usuário digita a descrição da tarefa.
const textArea = document.querySelector('.app__form-textarea');

// Lista (ou array) de tarefas. Ela começa vazia porque ainda não adicionamos nenhuma tarefa.
const tarefas = [];

// Ouvinte de eventos ao botão adicionado. Quando clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
  // Alterna a visibilidade do formulário.
  formAdicionarTarefa.classList.toggle('hidden');
})

// Ouvindo o evento 'submit' do formulário.
// Ocorre quando tentamos enviar o formulário.
formAdicionarTarefa.addEventListener('submit', (evento) => {
  // Evita que a página recarregue (comportamento padrão).
  evento.preventDefault();
  // Objeto tarefa com descrição da textarea.
  const tarefa = {
    descricao: textArea.value
  }
  // Adiciona essa tarefa ao array de tarefas.
  tarefas.push(tarefa);
  // Armazena a lista de tarefas no localStorage
  // Converte o array para uma string em formato JSON para poder armazenar.
  localStorage.setItem('tarefa', JSON.stringify(tarefas));
})