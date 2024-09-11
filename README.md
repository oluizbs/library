
# Sistema para biblioteca

Esse projeto tenta simular um sistema de uma biblioteca.

Para iniciar o servidor do projeto é necessario ter o NodeJS instalado.

É recomendável utilizar a extensão Live Server do VSCode para utilizar o projeto.

## Rodando localmente

Clone o projeto

```bash
    git clone https://github.com/oluizbs/library.git
```

Entre no diretório do projeto

```bash
    cd library
```

Instale as dependências

```bash
    npm install
```

Inicie o servidor

```bash
    npx json-server --watch db.json --port 8080
```

Inicie o projeto atráves da extensão Live Server do VSCode, através da página index.html

## Documentação

### Admin

O administrador do sistema é responsável por adicionar, editar e excluir livros do sistema da biblioteca.

Isso é feito através da URL: (caso esteja utilizando o Live Server)

```HTTP
    http://localhost:5500/views/admin.html
```  

### Bibliotecário

O Bibliotecário é responsável por adicionar, editar e remover usuários do sistema.

O bibliotecário também é responsavel por controlar o fluxo dos livros do sistema, ou seja, é de sua responsabilidade alterar os status de cada livro entre: "Ocupado", "Disponivel", "Em uso".

Isso é feito através da URL: (caso esteja utilizando o Live Server)

```HTTP
    http://localhost:5500/views/bibliotecario.html
```  

### Usuario

A seção de usuário funciona como um controle de fluxo para que o bibliotecário consiga administrar quais usuários leram cada livro.

Isso é feito através da URL: (caso esteja utilizando o Live Server)

```HTTP
    http://localhost:5500/views/usuario.html
```



# Documentação de Teste - Gestão de Biblioteca

### Visão Geral
Este documento descreve os cenários de teste realizados no sistema de biblioteca, cobrindo as funcionalidades de cada perfil (Admin, Bibliotecário, Usuário) e os procedimentos para verificar a operação correta de cada recurso. Utilizamos o Playwright para simular interações reais com a aplicação e validar o comportamento do sistema.

### Objetivo
Garantir que as funcionalidades CRUD (Criar, Alterar, Listar e Remover) dos cadastros de livros, usuários e o controle de fluxo de livros funcionam corretamente para cada perfil de usuário.

### Perfis de Usuário e Funcionalidades

#### Admin:
- Controle total sobre o cadastro de livros (CRUD completo).

#### Bibliotecário:
- Cadastro de usuários (Adicionar, Alterar, Remover).
- Controle de fluxo de livros (Alteração do status de "Disponível", "Ocupado", "Em uso").

#### Usuário:
- Controle de livros lidos (Selecionar livros disponíveis, sem repetição).

### Cenários de Teste

#### 1. Admin - Cadastro de Livros

##### Cenário 1.1: Criar Livro
- **Entrada:** Admin insere os detalhes do livro (Título, Autor, Ano).
- **Ação:** Envia o formulário de criação.
- **Resultado Esperado:** O livro aparece na lista de livros cadastrados.

##### Cenário 1.2: Alterar Livro
- **Entrada:** Admin seleciona um livro e altera suas informações.
- **Ação:** Envia o formulário de edição.
- **Resultado Esperado:** As novas informações são exibidas na lista de livros.

##### Cenário 1.3: Remover Livro
- **Entrada:** Admin seleciona um livro e clica no botão de remover.
- **Ação:** Confirma a remoção.
- **Resultado Esperado:** O livro não deve mais aparecer na lista.

---

#### 2. Bibliotecário - Cadastro de Usuários

##### Cenário 2.1: Criar Usuário
- **Entrada:** Bibliotecário insere os dados do usuário (Nome, Email).
- **Ação:** Envia o formulário de criação.
- **Resultado Esperado:** O usuário aparece na lista de usuários cadastrados.

##### Cenário 2.2: Alterar Usuário
- **Entrada:** Bibliotecário seleciona um usuário e altera suas informações.
- **Ação:** Envia o formulário de edição.
- **Resultado Esperado:** As informações atualizadas são exibidas na lista de usuários.

##### Cenário 2.3: Remover Usuário
- **Entrada:** Bibliotecário seleciona um usuário e clica em remover.
- **Ação:** Confirma a remoção.
- **Resultado Esperado:** O usuário não deve mais aparecer na lista.

---

#### 3. Bibliotecário - Controle de Fluxo dos Livros

##### Cenário 3.1: Alterar Status do Livro
- **Entrada:** Bibliotecário seleciona um livro e altera seu status para "Ocupado", "Disponível" ou "Em uso".
- **Ação:** Atualiza o status.
- **Resultado Esperado:** O novo status do livro deve ser exibido corretamente.

---

#### 4. Usuário - Controle de Livros Lidos

##### Cenário 4.1: Selecionar Livro Disponível
- **Entrada:** Usuário acessa a lista de livros disponíveis e escolhe um livro que ainda não leu.
- **Ação:** Seleciona o livro.
- **Resultado Esperado:** O livro é marcado como "lido" para o usuário e não pode ser selecionado novamente.

---

### Processo de Teste
Para cada um dos cenários, foi criado um script de teste automatizado utilizando a extensão Playwright.

```HTTP
    npx playwright test
``` 

### Conclusão
Os testes foram executados com sucesso utilizando a extensão Playwright. Todos os cenários cobertos, desde a criação de livros até o controle de status e seleção de livros por usuários, funcionam conforme esperado. A validação foi feita através da verificação de texto na interface e da simulação das ações do usuário real no sistema.
