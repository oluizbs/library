const { test, expect } = require('@playwright/test');

// Testes para Admin
test('Admin - Cadastrar, listar e remover livros', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Navegar para a página de Admin
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Cadastrar novo livro' }).click();

  // Preencher o formulário de novo livro
  await page.getByPlaceholder('Nome do Livro').fill('Livro teste 2');
  await page.getByPlaceholder('Nome do Autor').fill('Autor teste 2');

  // Interagir com diálogos de confirmação
  page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Submeter o formulário
  await page.getByRole('button', { name: 'Adicionar' }).click();

  // Listar livros existentes e validar
  await page.getByRole('button', { name: 'Listar livros existentes' }).click();

  // Remover o livro
  await page.getByRole('row', { name: 'Livro teste 2 Autor teste 2' }).getByRole('button').nth(1).click();
});

// Testes para Bibliotecário
test('Bibliotecario - Gerenciar usuários e alterar status de livros', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Navegar para a página do Bibliotecário e gerenciamento de usuários
  await page.getByRole('link', { name: 'Bibliotecário' }).click();
  await page.getByRole('link', { name: 'Gerenciar Usuários' }).click();

  // Preencher o formulário de novo usuário
  await page.getByLabel('Nome:').fill('usuario teste');
  await page.getByLabel('E-mail:').fill('teste@usuario.com');

  // Interagir com diálogos de confirmação
  page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Submeter o formulário de usuário
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await page.getByRole('button', { name: 'Listar Clientes' }).click();

  // Navegar para a página de controle de fluxo de livros
  await page.goto('http://127.0.0.1:5500/bibliotecario/fluxoLivros.html');

  // Alterar status do livro
  await page.getByRole('row', { name: '8b57 A Revolução dos Bichos' }).getByRole('cell').nth(3).click();
  await page.getByRole('combobox').selectOption('Em uso');
});

// Testes para Usuário
test('Usuario - Selecionar, adicionar e remover livro', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Navegar para a página de Usuário
  await page.getByRole('link', { name: 'Usuário' }).click();
  await page.getByRole('button', { name: 'Selecionar' }).click();

  // Selecionar livro e marcar como lido
  await page.getByRole('button', { name: 'Novo Livro Lido' }).click();
  await page.locator('#books').selectOption('4c56');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByRole('button', { name: 'Listar Livros Lidos' }).click();

  // Remover o livro da lista
  await page.getByRole('button', { name: 'Remover' }).nth(1).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
});