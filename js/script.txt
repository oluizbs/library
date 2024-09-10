import {API} from "./api.js"

document.getElementById('addBookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const bookName = document.getElementById('bookName').value;
  
  fetch(API+'/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book_name: bookName }),
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
      loadBooks(); 
    })
    .catch(error => {
      alert('Ocorreu um erro ao adicionar o livro. Verifique os dados e tente novamente.');
    });
});

document.getElementById("listBooksButton").addEventListener('click', loadBooks);

function loadBooks() {
  fetch(API+"/books")
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
  ul.innerHTML = ''; 
  for (const book of books) {
    const li = document.createElement("li");

    li.innerText = book.book_name;

    const editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.onclick = () => editBook(book.id);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remover";
    removeButton.onclick = () => removeBook(book.id);

    li.appendChild(editButton);
    li.appendChild(removeButton);

    ul.appendChild(li);
  }
}

function editBook(bookId) {
  const newBookName = prompt("Digite o novo nome do livro:");
  if (!newBookName) {
    alert("O nome do livro não pode ser vazio!");
    return;
  }

  fetch(API + '/books/' + bookId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book_name: newBookName }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao alterar o livro: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      alert('Livro alterado com sucesso!');
      loadBooks(); 
    })
    .catch(error => {
      alert('Ocorreu um erro ao alterar o livro. Verifique os dados e tente novamente.');
    });
}

function removeBook(bookId) {
  if (!confirm("Tem certeza de que deseja remover este livro?")) {
    return;
  }

  fetch(API + '/books/' + bookId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao remover o livro: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      alert('Livro removido com sucesso!');
      loadBooks();
    })
    .catch(error => {
      alert('Ocorreu um erro ao remover o livro. Verifique os dados e tente novamente.');
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
      loadBooks();
  });
});
