import {API} from "../js/api.js"
import {Book} from '../js/Book.js'

const clientChave = "client"

document.getElementById('addBookForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const bookId = document.getElementById('books').value;
  const book = await buscarLivro(bookId)
  const userId = carregarStorage(clientChave).id;
  const usuario = await buscarUsuario(userId);
  usuario.livrosLidos.push(book);
  const client = carregarStorage(clientChave)
  await readBook(client.id,usuario);
});

function carregarStorage(chave){
  const client = localStorage.getItem(chave)
  if(!client){
    return []
  }
  
  const clientFormatado = JSON.parse(client)
  document.getElementById("msgSelect").innerText = clientFormatado.nome
  return clientFormatado
}

function salvarStorage(chave, client){
  localStorage.setItem(chave,JSON.stringify(client))
  document.getElementById("msgSelect").innerText = client.nome
}


async function buscarLivro(bookId) {
  try {
    const response = await fetch(`${API}/books/${bookId}`);
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    alert('Ocorreu um erro ao adicionar o livro. Verifique os dados e tente novamente.');
  }
}

async function buscarUsuario(userId) {
  try {
    const response = await fetch(`${API}/clients/${userId}`);
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error('Ocorreu um erro ao carregar os livros:', error);
    alert('Ocorreu um erro ao carregar os livros. Verifique o console para mais detalhes.');
  }
}

async function loadBooks() {
  try {
    const response = await fetch(`${API}/books`);
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    alert('Ocorreu um erro ao carregar os livros. Verifique os dados e tente novamente.');
  }
}

async function trocarLivro(livroId){
    const books = await loadBooks();
    desenharSelectEditLivros(books);
    document.getElementById('confirmar').addEventListener('click', async () => {
      const bookId = document.getElementById('editLivros').value
      const newBook = await buscarLivro(bookId);
      const livrosLidos = carregarStorage(clientChave).livrosLidos
      let chave = 0;
      for(let livro of livrosLidos){
        if(livro.id == livroId){
          livrosLidos[chave] = newBook;
          break;
      }
      ++chave
    }
    const userId = carregarStorage(clientChave).id;
    const client = await buscarUsuario(userId);
    client.livrosLidos = livrosLidos;
    editBook(userId, client)
    salvarStorage(clientChave, client)
    })
}

async function desenharSelectEditLivros(books) {
  const userId = carregarStorage(clientChave).id;
  const usuario = await buscarUsuario(userId);
  const livrosNaoLidos = books.filter(book => {
    // Verifica se o livro atual está na lista de livros lidos pelo usuário
    return !usuario.livrosLidos.some(livroLido => livroLido.id === book.id);
  });

  const select = document.querySelector('#editLivros');
  select.innerHTML = ''; // Limpa a lista de opções antes de desenhar os livros não lidos

  for (const book of livrosNaoLidos) {
    const option = document.createElement("option");
    option.value = book.id;
    option.text = `${book.nome} - ${book.autor}`;
    select.appendChild(option);
  }
}

async function editBook(userId, client) {
  try {
    const response = await fetch(`${API}/clients/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client)
    });

    if (!response.ok) {
      throw new Error('Erro ao alterar o livro: ' + response.statusText);
    }

    await response.json();
    alert('Livro alterado com sucesso!');
    loadBooks();
  } catch (error) {
    alert('Ocorreu um erro ao alterar o livro. Verifique os dados e tente novamente.');
  }
}

async function readBook(userId, usuario) {
  try {
    const response = await fetch(`${API}/clients/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error('Erro ao alterar o livro: ' + response.statusText);
    }

    return response.json()
  } catch (error) {
    alert('Ocorreu um erro ao alterar o livro. Verifique os dados e tente novamente.');
  }
}

async function removeBook(bookId) {
  if (!confirm("Tem certeza de que deseja remover este livro?")) {
    return;
  }

  try {
    const response = await fetch(`${API}/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao remover o livro: ' + response.statusText);
    }

    await response.json();
    alert('Livro removido com sucesso!');
    loadBooks();
  } catch (error) {
    alert('Ocorreu um erro ao remover o livro. Verifique os dados e tente novamente.');
  }
}

async function desenharSelectLivros(books) {
  const userId = carregarStorage(clientChave).id;
  const usuario = await buscarUsuario(userId);
  const livrosNaoLidos = books.filter(book => {
      return !usuario.livrosLidos.some(livroLido => livroLido.id === book.id);
  });

  const select = document.querySelector('#books');
  select.innerHTML = ''; 

  for (const book of livrosNaoLidos) {
    const option = document.createElement("option");
    option.value = book.id;
    option.text = `${book.nome} - ${book.autor}`;
    select.appendChild(option);
  }
}
async function desenharTableLivros(books) {
  const userId = carregarStorage(clientChave).id;
  const usuario = await buscarUsuario(userId);
  const livrosLidos = carregarStorage(clientChave).livrosLidos;
  const tbody = document.querySelector('#bookListTable tbody');
  tbody.innerHTML = ''; 

    for (const book of livrosLidos) {
      const tr = document.createElement('tr')

      const tdNome = document.createElement('td')
      tdNome.innerText = book.nome;

      const tdAutor = document.createElement('td')
      tdAutor.innerText = book.autor;

      const editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.onclick = () => trocarLivro(book.id);

      const removeButton = document.createElement("button");
      removeButton.innerText = "Remover";
      removeButton.onclick = () => removeBook(book.id);

      const tdOpcoes = document.createElement('td');
      tdOpcoes.append(editButton, removeButton);

      tr.append(tdNome, tdAutor, tdOpcoes)
      tbody.appendChild(tr);
    }
}
document.addEventListener('DOMContentLoaded',async () => {
  const addBookButton = document.getElementById('addBookButton');
  const listBooksButton = document.getElementById('listBooksButton');
  const formSection = document.querySelector('.form-section');
  const listSection = document.querySelector('.list-section');

  const selectClients = document.getElementById("clients")

  const clients = await loadClients()

  for (const client of clients) {
    const option = document.createElement('option')
    option.value = client.id
    option.textContent = client.nome
    selectClients.appendChild(option)
  }
  document.getElementById("selecionarCliente").addEventListener("click", async () =>{
    const clienteId = selectClients.value
    const client = await buscarUsuario(clienteId)
    salvarStorage(clientChave, client)
  })

  formSection.classList.remove('show');
  listSection.classList.remove('show');

  addBookButton.addEventListener('click', async () => {
    formSection.classList.add('show');
    listSection.classList.remove('show');
    const books = await loadBooks();
    desenharSelectLivros(books)
  });
  
  listBooksButton.addEventListener('click', async () => {
    listSection.classList.add('show');
    formSection.classList.remove('show');
    const books = await loadBooks();
    desenharTableLivros(books)
  });
});

loadBooks();

async function loadClients() {
  try {
    const response = await fetch(`${API}/clients`);
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    
    return response.json()
  } catch (error) {
    alert('Ocorreu um erro ao carregar os livros. Verifique os dados e tente novamente.');
  }
}