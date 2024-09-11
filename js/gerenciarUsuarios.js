import { API } from "./api.js";
import { Client } from "./Client.js";  
document.getElementById('addClientForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const clientName = document.getElementById('clientName').value;
  const clientEmail = document.getElementById('clientEmail').value;
  const client = new Client(clientName, clientEmail);
  
  try {
    const response = await fetch(`${API}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    
    await response.json();
    alert('Cliente adicionado com sucesso!');
    document.getElementById('addClientForm').reset();
    loadClients(); 
  } catch (error) {
    alert('Ocorreu um erro ao adicionar o cliente. Verifique os dados e tente novamente.');
  }
});

document.getElementById("listClientsButton").addEventListener('click', loadClients);

async function loadClients() {
  try {
    const response = await fetch(`${API}/clients`);
    
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    
    const clients = await response.json();
    styleClients(clients);
  } catch (error) {
    alert('Ocorreu um erro ao carregar os clientes. Verifique os dados e tente novamente.');
  }
}

function styleClients(clients) {
  const tbody = document.querySelector("#clientListTable tbody");
  tbody.innerHTML = ''; 
  
  for (const client of clients) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.innerText = client.nome;

    const tdEmail = document.createElement('td');
    tdEmail.innerText = client.email;

    const editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.onclick = () => editClient(client.id);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remover";
    removeButton.onclick = () => removeClient(client.id);

    const tdOptions = document.createElement('td');
    tdOptions.append(editButton, removeButton);

    tr.append(tdName, tdEmail, tdOptions);
    tbody.appendChild(tr);
  }
}

async function editClient(clientId) {
  const newClientName = prompt("Digite o novo nome do cliente:");
  if (!newClientName) {
    alert("O nome do cliente não pode ser vazio!");
    return;
  }
  const newClientEmail = prompt("Digite o novo e-mail do cliente:");
  if (!newClientEmail) {
    alert("O e-mail do cliente não pode ser vazio!");
    return;
  }

  const client = await fetchClient(clientId);
  client.nome = newClientName;
  client.email = newClientEmail;

  try {
    const response = await fetch(`${API}/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao alterar o cliente: ' + response.statusText);
    }
    
    await response.json();
    alert('Cliente alterado com sucesso!');
    loadClients(); 
  } catch (error) {
    alert('Ocorreu um erro ao alterar o cliente. Verifique os dados e tente novamente.');
  }
}

async function fetchClient(clientId) {
  try {
    const response = await fetch(`${API}/clients/${clientId}`);
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.statusText);
    }
    return response.json();
  } catch (error) {
    alert('Ocorreu um erro ao buscar o cliente. Verifique os dados e tente novamente.');
  }
}

async function removeClient(clientId) {
  if (!confirm("Tem certeza de que deseja remover este cliente?")) {
    return;
  }

  try {
    const response = await fetch(`${API}/clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao remover o cliente: ' + response.statusText);
    }
    
    await response.json();
    alert('Cliente removido com sucesso!');
    loadClients();
  } catch (error) {
    alert('Ocorreu um erro ao remover o cliente. Verifique os dados e tente novamente.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addClientButton = document.getElementById('addClientButton');
  const listClientsButton = document.getElementById('listClientsButton');
  const formSection = document.querySelector('.form-section');
  const listSection = document.querySelector('.list-section');

  formSection.classList.remove('show');
  listSection.classList.remove('show');

  addClientButton.addEventListener('click', () => {
      formSection.classList.add('show');
      listSection.classList.remove('show');
  });

  listClientsButton.addEventListener('click', () => {
      listSection.classList.add('show');
      formSection.classList.remove('show');
      loadClients();
  });
});
