export class Client {

    nome;
    email;
    livrosLidos;

    constructor(nome, email, livrosLidos =[]){
        this.nome = nome
        this.email = email
        this.livrosLidos = livrosLidos
    }

}