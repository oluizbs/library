import { API } from "../js/api.js";

document.addEventListener('DOMContentLoaded', () => {
  loadBooks(); // Carregar os livros ao carregar a página
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
      console.log('Dados recebidos:', data); // Verifique os dados recebidos
      const books = data; // Acessar o array de livros dentro do JSON
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
      console.log('Dados recebidos:', data); // Verifique os dados recebidos
      const book = data; // Acessar o array de livros dentro do JSON
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
  tbody.innerHTML = ''; // Limpar o conteúdo existente da tabela
  
  for (const book of books) {
    // Verifique se o livro tem os campos necessários
    if (book.id) {
      const tr = document.createElement("tr");
      tr.dataset.id = book.id
      // Coluna ID
      const idTd = document.createElement("td");
      idTd.innerText = book.id || 'ID não disponível';
      tr.appendChild(idTd);

      // Coluna Nome do Livro
      const nameTd = document.createElement("td");
      nameTd.innerText = book.nome || 'Nome não disponível'; // Exibir 'Nome não disponível' se book_name não estiver presente
      tr.appendChild(nameTd);

      const autorTd = document.createElement("td");
      autorTd.innerText = book.autor || 'Nome do autor não disponível'; // Exibir 'Nome não disponível' se book_name não estiver presente
      tr.appendChild(autorTd);

      // Coluna Status com dropdown para alterar o status
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

      // Adiciona a linha à tabela
      tbody.appendChild(tr);
    } else {
      console.warn('Livro sem ID:', book); // Adicione um aviso para livros sem ID
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
      loadBooks(); // Recarregar a lista de livros para refletir a atualização
    })
    .catch(error => {
      console.error('Ocorreu um erro ao atualizar o status do livro:', error);
      alert('Ocorreu um erro ao atualizar o status do livro. Verifique o console para mais detalhes.');
    });
}
