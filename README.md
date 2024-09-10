
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
    GET http://localhost:5500/admin/admin.html
```  

### Bibliotecário

O Bibliotecário é responsável por adicionar, editar e remover usuários do sistema.

O bibliotecário também é responsavel por controlar o fluxo dos livros do sistema, ou seja, é de sua responsabilidade alterar os status de cada livro entre: "Ocupado", "Disponivel", "Em uso".

Isso é feito através da URL: (caso esteja utilizando o Live Server)

```HTTP
    GET http://localhost:5500/bibliotecario/bibliotecario.html
```  

### Usuario

O usuário do sistema tem controle sobre as informações dos livros que ele leu.

Isso é feito através da URL: (caso esteja utilizando o Live Server)

```HTTP
    GET http://localhost:5500/usuario/usuario.html
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```
