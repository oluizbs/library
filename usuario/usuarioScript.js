import {API} from "../js/api.js"
import {Book} from '../js/Book.js'

document.getElementById('addBookForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const bookId = document.getElementById('books').value;
  const book = await buscarLivro(bookId)
  const usuario = await buscarUsuario();
  usuario.livrosLidos.push(book);
  await readBook(2,usuario);
});


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

async function buscarUsuario(userId = 2) {
  try {
    const response = await fetch(`${API}/usuarios/${userId}`);
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

async function editBook(bookId) {
  const newBookName = prompt("Digite o novo nome do livro:");
  if (!newBookName) {
    alert("O nome do livro não pode ser vazio!");
    return;
  }

  try {
    const response = await fetch(`${API}/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_name: newBookName }),
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

async function readBook(userId = 2, usuario) {
  try {
    const response = await fetch(`${API}/usuarios/${userId}`, {
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
  const usuario = await buscarUsuario();
  const livrosNaoLidos = books.filter(book => {
    // Verifica se o livro atual está na lista de livros lidos pelo usuário
    return !usuario.livrosLidos.some(livroLido => livroLido.id === book.id);
  });

  const select = document.querySelector('#books');
  select.innerHTML = ''; // Limpa a lista de opções antes de desenhar os livros não lidos

  for (const book of livrosNaoLidos) {
    const option = document.createElement("option");
    option.value = book.id;
    option.text = `${book.nome} - ${book.autor}`;
    select.appendChild(option);
  }
}
async function desenharTableLivros(books) {
  const usuario = await buscarUsuario();
  const livrosLidos = books.filter(book => {
    // Verifica se o livro atual está na lista de livros lidos pelo usuário
    return usuario.livrosLidos.some(livroLido => livroLido.id === book.id);
  });

  const tbody = document.querySelector('#bookListTable tbody');
  tbody.innerHTML = ''; // Limpa a lista de opções antes de desenhar os livros não lidos

    for (const book of livrosLidos) {
      const tr = document.createElement('tr')

      const tdNome = document.createElement('td')
      tdNome.innerText = book.nome;

      const tdAutor = document.createElement('td')
      tdAutor.innerText = book.autor;

      const editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.onclick = () => editBook(book.id);

      const removeButton = document.createElement("button");
      removeButton.innerText = "Remover";
      removeButton.onclick = () => removeBook(book.id);

      const tdOpcoes = document.createElement('td');
      tdOpcoes.append(editButton, removeButton);

      tr.append(tdNome, tdAutor, tdOpcoes)
      tbody.appendChild(tr);
    }
}
document.addEventListener('DOMContentLoaded', () => {
  const addBookButton = document.getElementById('addBookButton');
  const listBooksButton = document.getElementById('listBooksButton');
  const formSection = document.querySelector('.form-section');
  const listSection = document.querySelector('.list-section');

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
