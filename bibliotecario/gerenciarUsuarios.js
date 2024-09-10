import { API } from "../js/api.js"
import {Book} from '../js/Book.js'

document.getElementById('addBookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const bookName = document.getElementById('bookName').value;
  const autor = document.getElementById('autor').value;
  const book = new Book(bookName,autor)
  
  fetch(API+'/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      alert('Livro adicionado com sucesso!');
      document.getElementById('addBookForm').reset();
      loadBooks(); // Recarregar a lista de livros após adicionar
    })
    .catch(error => {
      alert('Ocorreu um erro ao adicionar o livro. Verifique os dados e tente novamente.');
    });
});

document.getElementById("listBooksButton").addEventListener('click', loadBooks);

function loadBooks() {
  fetch(API + "/books")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor: ' + response.statusText);
      }
      return response.json();
    })
    .then(books => {
      styleLivros(books);
    })
    .catch(error => {
      alert('Ocorreu um erro ao carregar os livros. Verifique os dados e tente novamente.');
    });
}

function styleLivros(books) {
  const ul = document.getElementById("bookList");
  ul.innerHTML = ''; // Limpar a lista antes de renderizar novamente
  for (const book of books) {
    const li = document.createElement("li");

    // Exibir o nome do livro e o status atual
    li.innerText = `${book.book_name} - Status: ${book.status}`;

    // Dropdown para selecionar o status do livro
    const statusSelect = document.createElement("select");

    const statuses = ['Disponível', 'Em uso', 'Ocupado'];
    statuses.forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.text = status;
      option.selected = book.status === status;
      statusSelect.appendChild(option);
    });

    // Atualiza o status quando o bibliotecário muda a opção no dropdown
    statusSelect.addEventListener('change', () => {
      updateBookStatus(book.id, statusSelect.value);
    });

    li.appendChild(statusSelect);
    ul.appendChild(li);
  }

}

// Função para atualizar o status do livro
function updateBookStatus(bookId, newStatus) {
  fetch(API + '/books/' + bookId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({status: newStatus }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar o status: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      alert('Status do livro atualizado com sucesso!');
      loadBooks(); // Recarregar a lista de livros após a atualização
    })
    .catch(error => {
      alert('Ocorreu um erro ao atualizar o status do livro. Verifique os dados e tente novamente.');
    });
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
      loadBooks(); // Carregar os livros quando a lista for exibida
  });
});
