
def create_book
  print "Digite o nome do livro a ser adicionado: "
  book_name = gets.chomp
  unless book_name.empty?
    File.open("books.txt", "a") do |file|
      file.puts(book_name)
    end
    puts "Livro '#{book_name}' adicionado com sucesso!"
  else
    puts "O nome do livro não pode ser vazio."
  end
end

def read_books
  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)

    if books.empty?
      puts "Nenhum livro encontrado."
    else
      puts "Lista de livros:"
      books.each_with_index do |book, index|
        puts "#{index + 1}. #{book}"
      end
    end
  else
    puts "Arquivo de livros não encontrado."
  end
end

def remove_book
  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)

    if books.empty?
      puts "Nenhum livro encontrado."
      return
    end

    puts "Lista de livros:"
    books.each_with_index do |book, index|
      puts "#{index + 1}. #{book}"
    end

    print "Digite o número do livro que deseja remover: "
    choice = gets.chomp.to_i

    if choice > 0 && choice <= books.size
      removed_book = books.delete_at(choice - 1)

      File.open("books.txt", "w") do |file|
        books.each { |book| file.puts(book) }
      end

      puts "Livro '#{removed_book}' removido com sucesso!"
    else
      puts "Escolha inválida."
    end
  else
    puts "Arquivo de livros não encontrado."
  end
end

def alter_book
  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)

    if books.empty?
      puts "Nenhum livro encontrado."
      return
    end

    puts "Lista de livros:"
    books.each_with_index do |book, index|
      puts "#{index + 1}. #{book}"
    end

    print "Digite o número do livro que deseja alterar: "
    choice = gets.chomp.to_i

    if choice > 0 && choice <= books.size
      old_book = books[choice - 1]

      print "Digite o novo nome para o livro '#{old_book}': "
      new_book = gets.chomp

      if new_book.empty?
        puts "O novo nome do livro não pode ser vazio."
        return
      end

      books[choice - 1] = new_book

      File.open("books.txt", "w") do |file|
        books.each { |book| file.puts(book) }
      end

      puts "Livro alterado com sucesso para '#{new_book}'!"
    else
      puts "Escolha inválida."
    end
  else
    puts "Arquivo de livros não encontrado."
  end
end

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
