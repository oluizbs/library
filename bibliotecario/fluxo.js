import { API } from "../js/api.js";

document.addEventListener('DOMContentLoaded', () => {
  loadBooks(); 
});

function loadBooks() {
  fetch(API + "/books")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data); 
      const books = data; 
      renderBooksTable(books);
    })
    .catch(error => {
      console.error('Ocorreu um erro ao carregar os livros:', error);
      alert('Ocorreu um erro ao carregar os livros. Verifique o console para mais detalhes.');
    });
}
function altBook(bookId, status) {
  fetch(API + "/books/"+bookId)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      const book = data; 
      book.status = status
      updateBookStatus(bookId, book)
    })
    .catch(error => {
      console.error('Ocorreu um erro ao carregar os livros:', error);
      alert('Ocorreu um erro ao carregar os livros. Verifique o console para mais detalhes.');
    });
}

function renderBooksTable(books) {
  const tbody = document.querySelector("#bookTable tbody");
  tbody.innerHTML = ''; 
  
  for (const book of books) {
    if (book.id) {
      const tr = document.createElement("tr");
      tr.dataset.id = book.id
      // Coluna ID
      const idTd = document.createElement("td");
      idTd.innerText = book.id || 'ID não disponível';
      tr.appendChild(idTd);

      const nameTd = document.createElement("td");
      nameTd.innerText = book.nome || 'Nome não disponível'; 
      tr.appendChild(nameTd);

      const autorTd = document.createElement("td");
      autorTd.innerText = book.autor || 'Nome do autor não disponível'; 
      tr.appendChild(autorTd);

      const statusTd = document.createElement("td");
      const statusSelect = document.createElement("select");
      
      const statuses = ['Disponível', 'Em uso', 'Ocupado'];
      for (const status of statuses) {
        
        const option = document.createElement("option");
        option.value = status;
        option.text = status;
        option.selected = book.status === status;
        statusSelect.appendChild(option);
      }
      statusSelect.addEventListener('change', () => {
        altBook(tr.dataset.id, statusSelect.value)
      });

      statusTd.appendChild(statusSelect);
      tr.appendChild(statusTd);
      tbody.appendChild(tr);
    } else {
      console.warn('Livro sem ID:', book); 
    }
  }
}

function updateBookStatus(bookId, book) {
  fetch(API + '/books/' + bookId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar o status: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      alert('Status do livro atualizado com sucesso!');
      loadBooks(); 
    })
    .catch(error => {
      console.error('Ocorreu um erro ao atualizar o status do livro:', error);
      alert('Ocorreu um erro ao atualizar o status do livro. Verifique o console para mais detalhes.');
    });
}
