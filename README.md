# Sistema de Biblioteca em Ruby

Este projeto é um sistema simples de gerenciamento de biblioteca desenvolvido em Ruby. Ele permite a criação, leitura, alteração e remoção de livros armazenados em um arquivo de texto (`books.txt`). 

## Funcionalidades

- **Criar Livro:** Adiciona um novo livro ao arquivo `books.txt`.
- **Ler Livros:** Exibe a lista de livros armazenados no arquivo.
- **Alterar Livro:** Atualiza o nome de um livro existente.
- **Remover Livro:** Remove um livro da lista.

## Requisitos

- Ruby instalado no seu ambiente de desenvolvimento.
- O arquivo `books.txt` será criado automaticamente se não existir.

## Uso

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd seu-repositorio
   ```

3. **Execute o script Ruby:**

   ```bash
   ruby nome_do_script.rb
   ```

## Código

### `create_book`

Adiciona um novo livro ao arquivo `books.txt`.

**Entrada:**
- Nome do livro (string)

**Saída:**
- Mensagem de sucesso se o livro for adicionado com sucesso.
- Mensagem de erro se o nome do livro estiver vazio.

**Exemplo:**

```ruby
create_book
```

### `read_books`

Exibe todos os livros armazenados no arquivo `books.txt`.

**Entrada:**
- Nenhuma

**Saída:**
- Lista de livros com números de índice.
- Mensagem informando que nenhum livro foi encontrado se o arquivo estiver vazio ou não existir.

**Exemplo:**

```ruby
read_books
```

### `remove_book`

Remove um livro da lista com base na escolha do usuário.

**Entrada:**
- Número do livro a ser removido (inteiro)

**Saída:**
- Mensagem de sucesso se o livro for removido com sucesso.
- Mensagem de erro se a escolha for inválida ou o arquivo não for encontrado.

**Exemplo:**

```ruby
remove_book
```

### `alter_book`

Atualiza o nome de um livro existente com base na escolha do usuário.

**Entrada:**
- Número do livro a ser alterado (inteiro)
- Novo nome do livro (string)

**Saída:**
- Mensagem de sucesso se o livro for alterado com sucesso.
- Mensagem de erro se a escolha for inválida ou o novo nome estiver vazio.

**Exemplo:**

```ruby
alter_book
```

## Menu Principal

O script exibe um menu para o usuário escolher entre as seguintes opções:

1. Criar - Adiciona um novo livro.
2. Ler - Exibe a lista de livros.
3. Alterar - Altera o nome de um livro existente.
4. Remover - Remove um livro da lista.
5. Encerrar programa - Encerra o script.

**Exemplo de menu:**

```ruby
loop do
  puts "------------------------\n1.Criar\n2.Ler\n3.Alterar\n4.Remover\n5.Encerrar programa"
  print "Digite o código da função que deseja usar:  "
  option = gets.chomp.to_i

  case option
  when 1
    create_book
  when 2
    read_books
  when 3
    alter_book
  when 4
    remove_book
  when 5
    puts "Encerrando o programa..."
    break
  else
    puts "Opção inválida. Tente novamente."
  end
end
```
