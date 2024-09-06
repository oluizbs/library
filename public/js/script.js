document.addEventListener('DOMContentLoaded', fetchBooks);

document.getElementById('add-book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const bookName = document.getElementById('book_name').value;
  
  fetch('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ book_name: bookName })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    fetchBooks();
  })
  .catch(error => console.error('Erro:', error));
});

function showUpdateForm(index, oldName) {
  document.getElementById('update_index').value = index;
  document.getElementById('update_name').value = oldName;
  document.getElementById('update-book-form').style.display = 'block';
}

document.getElementById('update-book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const index = document.getElementById('update_index').value;
  const newName = document.getElementById('update_name').value;
  
  fetch(`/books/${index}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ new_name: newName })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    document.getElementById('update-book-form').style.display = 'none';
    fetchBooks();
  })
  .catch(error => console.error('Erro:', error));
});

document.getElementById('cancel-update').addEventListener('click', function() {
  document.getElementById('update-book-form').style.display = 'none';
});

function fetchBooks() {
  fetch('/books')
    .then(response => response.json())
    .then(data => {
      const bookList = document.getElementById('book-list');
      bookList.innerHTML = '';

      if (data.length > 0) {
        data.forEach((book, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = book;
          listItem.innerHTML += `
            <button onclick="removeBook(${index})">Remover</button>
            <button onclick="showUpdateForm(${index}, '${book}')">Alterar</button>
          `;
          bookList.appendChild(listItem);
        });
      } else {
        bookList.innerHTML = '<li>Nenhum livro encontrado.</li>';
      }
    })
    .catch(error => console.error('Erro:', error));
}

function removeBook(index) {
  fetch(`/books/${index}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    fetchBooks();
  })
  .catch(error => console.error('Erro:', error));
}
