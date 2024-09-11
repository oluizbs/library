import { API } from "./api.js";
import { Book } from "./Book.js";

document.getElementById('addBookForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const bookName = document.getElementById('bookName').value;
  const autor = document.getElementById('autor').value;
  const book = new Book(bookName, autor);
  
  try {
    const response = await fetch(`${API}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    
    await response.json();
    alert('Livro adicionado com sucesso!');
    document.getElementById('addBookForm').reset();
    loadBooks(); 
  } catch (error) {
    alert('Ocorreu um erro ao adicionar o livro. Verifique os dados e tente novamente.');
  }
});

document.getElementById("listBooksButton").addEventListener('click', loadBooks);

async function loadBooks() {
  try {
    const response = await fetch(`${API}/books`);
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    
    const books = await response.json();
    styleLivros(books);
  } catch (error) {
    alert('Ocorreu um erro ao carregar os livros. Verifique os dados e tente novamente.');
  }
}

function styleLivros(books) {
  const tbody = document.querySelector("#bookListTable tbody");
  tbody.innerHTML = ''; 
  
  for (const book of books) {
    const tr = document.createElement('tr');

    const tdNome = document.createElement('td');
    tdNome.innerText = book.nome;

    const tdAutor = document.createElement('td');
    tdAutor.innerText = book.autor;

    const editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.onclick = () => editBook(book.id);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remover";
    removeButton.onclick = () => removeBook(book.id);

    const tdOpcoes = document.createElement('td');
    tdOpcoes.append(editButton, removeButton);

    tr.append(tdNome, tdAutor, tdOpcoes);
    tbody.appendChild(tr);
  }
}

async function editBook(bookId) {
  const newBookName = prompt("Digite o novo nome do livro:");
  if (!newBookName) {
    alert("O nome do livro não pode ser vazio!");
    return;
  }
  const newAutorName = prompt("Digite o novo nome do autor:");
  if (!newAutorName) {
    alert("O nome do autor não pode ser vazio!");
    return;
  }

  const livro = await buscarLivro(bookId);
  livro.nome = newBookName;
  livro.autor = newAutorName;

  try {
    const response = await fetch(`${API}/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
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

document.addEventListener('DOMContentLoaded', () => {
  const addBookButton = document.getElementById('addBookButton');
  const listBooksButton = document.getElementById('listBooksButton');
  const formSection = document.querySelector('.form-section');
  const listSection = document.querySelector('.list-section');

  formSection.classList.remove('show');
  listSection.classList.remove('show');

  addBookButton.addEventListener('click', () => {
      formSection.classList.add('show');
      listSection.classList.remove('show');
  });

  listBooksButton.addEventListener('click', () => {
      listSection.classList.add('show');
      formSection.classList.remove('show');
      loadBooks();
  });
});
