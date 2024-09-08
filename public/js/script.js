document.getElementById('addBookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const bookName = document.getElementById('bookName').value;
  
  fetch('/books', {
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
      console.log('Livro adicionado:', data);
      loadBooks();
      document.getElementById('addBookForm').reset();
    })
    .catch(error => {
      console.error('Erro ao adicionar livro:', error);
      alert('Ocorreu um erro ao adicionar o livro. Verifique os dados e tente novamente.');
    });
});

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
  });
});