function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value

    if (novaTarefa.trim() !== '') {
        criaNovoItemDaLista(novaTarefa);
        document.getElementById('input_nova_tarefa').value = ''; 
    }else{
       alert("Digite uma tarefa");
    }
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas   = listaTarefas.children.length
    
    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    // doubleclick para edit
    novoItem.addEventListener('dblclick', function(){
        editarTarefa(novoItem);
    });

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)
}


function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }    
}


function editarTarefa(itemLista) {
    // Acessa o primeiro elemento de lista
    const textoItem = itemLista.firstChild;

    // Cria um novo elemento 
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    // Define o valor do novo input como o texto da tarefa
    novoInput.value = textoItem.textContent;

    // Adiciona um ouvinte de evento de 'blur' ao novo input
    // O evento 'blur' ocorre quando o elemento perde o foco
    novoInput.addEventListener('blur', () => salvaEdicao(itemLista, novoInput));

    // Substitui o texto original da tarefa pelo novo input
    textoItem.replaceWith(novoInput);
}

function salvaEdicao(itemLista, novoInput) {
    // Obtém o valor do novo input
    const novoTexto = novoInput.value;

    // Cria um novo elemento span para armazenar o novo texto da tarefa
    const textoItem = document.createElement('span');
    textoItem.textContent = novoTexto;

    // Verifica se o novo texto da tarefa não está vazio
    if (textoItem.textContent.trim() !== '') {
        // Substitui o novo input pelo novo elemento span
        novoInput.replaceWith(textoItem);
    } else {
        // Exibe um alerta solicitando ao usuário que digite uma tarefa
        alert('Digite uma tarefa');
    }
}

function ocultarTarefa() {
    // Seleciona todos os checkboxes no documento
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Itera sobre cada checkbox
    checkboxes.forEach(function(checkbox) {
        // Verifica se o checkbox está marcado
        if (checkbox.checked) {
            // Verifica o estilo de exibição do elemento principal
            if (checkbox.parentNode.style.display === 'list-item') {
                checkbox.parentNode.style.display = 'none';
            } else {
                checkbox.parentNode.style.display = 'list-item';
            }
        }
    });
}
