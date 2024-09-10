export class Book{
    nome = '';
    autor = '';
    status = '';
    constructor(nome,autor,status = 'Disponível'){
        this.nome=nome
        this.autor=autor
        this.status=status
    }
}