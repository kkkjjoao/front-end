function validaSeExisteTarefasNoLocalStorageEMostraNaTela() {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        listaTarefas.forEach(tarefa => {
            const listaTarefas = document.getElementById('lista_de_tarefas')
            const novoItem = document.createElement('li')
            novoItem.innerText = tarefa.descricao
            novoItem.id = tarefa.id
            novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id, tarefa.status))
            if (tarefa.status === 'fechada') {
               novoItem.style.textDecoration =  'line-through'    
            }
            listaTarefas.appendChild(novoItem)
        });
    }
    // Carregar e aplicar configurações de ocultar/mostrar
    if (localStorage.getItem('configuracoes') != null) {
        // Verifica se existem configurações salvas no localStorage
        const configuracoes = JSON.parse(localStorage.getItem('configuracoes'));
        if (configuracoes.ocultar) {
            // Se a configuração indicar que as tarefas devem ser ocultadas, chama a função ocultarTarefa()
            ocultarTarefa();
        }
    }

}

function adicionaTarefaNaLista(){
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value

    if (novaTarefa.trim() !== '') {
        criaNovoItemDaLista(novaTarefa)
        document.getElementById('input_nova_tarefa').value = ''
    }else{
       alert("Digite uma tarefa")
    }

}

function criaNovoItemDaLista(textoDaTarefa){
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
        editarTarefa(novoItem)
    })

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)

    const tarefa = montaTarefa(novoItem.id, novoItem.innerText, 'aberta')
    adicionaTarefaAListaLocalStorage(tarefa)
  
    
}

function criaInputCheckBoxTarefa(idTarefa, status) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    if (status === 'fechada') {
        inputTarefa.checked = true
    }
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
    // Atualizar no localStorage
    mudaEstadoTarefaLocalStorage(idTarefa)
}

function editarTarefa(novoItem) {
    // Acessa o primeiro elemento de lista
    const textoItem = novoItem.firstChild

    // Cria um novo elemento 
    const novoInput = document.createElement('input')
    novoInput.type = 'text'
    // Define o valor do novo input como o texto da tarefa
    novoInput.value = textoItem.textContent

    // Adiciona um ouvinte de evento de 'blur' ao novo input
    // O evento 'blur' ocorre quando o elemento perde o foco
    novoInput.addEventListener('blur', () => salvaEdicao( novoInput))

    // Substitui o texto original da tarefa pelo novo input
    textoItem.replaceWith(novoInput)
     
        
}

function editarTarefa(itemLista) {
    // Acessa o primeiro elemento de lista
    const textoItem = itemLista.firstChild

    // Cria um novo elemento 
    const novoInput = document.createElement('input')
    novoInput.type = 'text'
    // Define o valor do novo input como o texto da tarefa
    novoInput.value = textoItem.textContent

    // Adiciona um ouvinte de evento de 'blur' ao novo input
    // O evento 'blur' ocorre quando o elemento perde o foco
    novoInput.addEventListener('blur', () => salvaEdicao(itemLista, novoInput))

    // Substitui o texto original da tarefa pelo novo input
    textoItem.replaceWith(novoInput)
}

function salvaEdicao(itemLista, novoInput) {
    // Obtém o valor do novo input
    const novoTexto = novoInput.value

    // Cria um novo elemento span para armazenar o novo textoda tarefa
    const textoItem = document.createElement('span')
    textoItem.textContent = novoTexto

    // Verifica se o novo texto da tarefa não está vazio
    if (textoItem.textContent.trim() !== '') {
        // Substitui o novo input pelo novo elemento span
        novoInput.replaceWith(textoItem)
    } else {
        // Exibe um alerta solicitando ao usuário que digite uma tarefa
        alert('Digite uma tarefa')
    }
}

//function salvaEdicao(novoInput) {
    
    //// Obtém o valor do novo input
  //  const novoTexto = novoInput.value

    //// Verifica se o novo texto da tarefa não está vazio
    //if (novoTexto.trim() !== '') {
        //// Cria um novo elemento span para armazenar o novo texto da tarefa
      //  const textoItem = document.createElement('span')
        //textoItem.textContent = novoTexto 
        //// Substitui o novo input pelo novo elemento span
        //novoInput.replaceWith(textoItem)

        ////obtem id da tarefa a ser editada
        //const idTarefa = textoItem.parentNode.id

        ////muda descrição d tarefa no localStorage
        //mudaDescricaoTarefaLocalStorage(idTarefa, novoTexto)
    //} else {
        //// Exibe um alerta solicitando ao usuário que digite uma tarefa
        //alert('Digite uma tarefa')
    //}
        //// Atualizar no localStorage
      
//}

//function mudaDescricaoTarefaLocalStorage(idTarefa, novoTexto){
  //  const localStorage = window.localStorage
    //if (localStorage.getItem('lista_tarefas') != null) {
      //  let cont=0
        ////obtem lista de tarefas do localStorage
        //const listaTarefas = JSON.parse(window.localStorage.getItem('lista_Tarefas')) || []

        ////procura tarefa na lista e muda sua descrição
       // listaTarefas.forEach(tarefa=>{
            //if(tarefa.id===idTarefa){
            //    tarefa.descricao = novoTexto
          //  }
        //})
        ////salva lista atualizada na lista e atualiza sua descrição
      //  localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
    //    contador++
  //  }
//}


function ocultarTarefa() {
    // Seleciona todos os checkboxes no documento
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    // Itera sobre cada checkbox
    checkboxes.forEach(function(checkbox) {
        // Verifica se o checkbox está marcado
        if (checkbox.checked) {
                checkbox.parentNode.style.display = 'none'
        }
    })
    salvarConfiguracoesNoLocalStorage({ ocultar: true })
}

function desocultarTarefa(){
     // Seleciona todos os checkboxes no documento
     const fdp = document.querySelectorAll('input[type="checkbox"]')
     // Itera sobre cada checkbox
     fdp.forEach(function(fds) {
         // Verifica se o checkbox está marcado
         if (fds.checked) {
                 fds.parentNode.style.display = 'list-item'
         }
     })
         // Atualizar no localStorage
         salvarConfiguracoesNoLocalStorage({ ocultar: false })
}


function mudaEstadoTarefaLocalStorage(idTarefa) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                if (tarefa.status === 'aberta') {
                    tarefa.status = 'fechada'
                } else {
                    tarefa.status = 'aberta'
                }
                console.log(tarefa)
            }
            localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
            contador++
        })

    }
}

function salvarConfiguracoesNoLocalStorage(configuracoes) {
    // Salva as configurações no localStorage
    const localStorage = window.localStorage
    localStorage.setItem('configuracoes', JSON.stringify(configuracoes))
}

function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('lista_tarefas') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
}


function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

validaSeExisteTarefasNoLocalStorageEMostraNaTela()

