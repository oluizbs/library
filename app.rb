require 'sinatra'
require 'json'

# adicionei esse bglh aqui pra ver se funciona o json certinho
before do
  if request.media_type == 'application/json' && request.body.size > 0
    request.body.rewind
    @request_payload = JSON.parse(request.body.read, symbolize_names: true)
  else
    @request_payload = {}
  end
end

get '/' do
  erb :index
end

get '/books' do
  content_type :json
  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)
    books.to_json
  else
    { error: "Livro não encontrado" }.to_json
  end
end

post '/books' do
  content_type :json
  book_name = @request_payload[:book_name]

  if book_name && !book_name.empty?
    File.open("books.txt", "a") { |file| file.puts(book_name) }
    { message: "Livro '#{book_name}' adicionado com sucesso!" }.to_json
  else
    { error: "O livro precisa ter nome" }.to_json
  end
end

put '/books/:index' do
  content_type :json
  new_name = @request_payload[:new_name]
  index = params[:index].to_i

  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)
    if index >= 0 && index < books.size
      old_name = books[index]
      books[index] = new_name
      File.open("books.txt", "w") { |file| books.each { |book| file.puts(book) } }
      { message: "Livro '#{old_name}' atualizado para '#{new_name}'" }.to_json
    else
      { error: "Índice inválido." }.to_json
    end
  else
    { error: "Livro não encontrado." }.to_json
  end
end

delete '/books/:index' do
  content_type :json
  index = params[:index].to_i

  if File.exist?("books.txt")
    books = File.readlines("books.txt").map(&:chomp)

    if index >= 0 && index < books.size
      removed_book = books.delete_at(index)
      File.open("books.txt", "w") { |file| books.each { |book| file.puts(book) } }
      { message: "Livro '#{removed_book}' removido com sucesso!" }.to_json
    else
      { error: "Índice inválido" }.to_json
    end
  else
    { error: "Livro não encontrado." }.to_json
  end
end
