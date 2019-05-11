API feita em NodeJS + express e o banco de dados NoSQL MongoDB.

Para inciciar é necessário acessar a pasta api pelo prompt e utilizar o comando: 

  npm install 
  
É necessário ter o mongo server instalado e rodando. Ele pode ser baixado em: https://www.mongodb.com/download-center

As configurações gerais, tanto do banco quanto do express estão separadas na pasta config, e podem ser alteradas conforme a necessidade.

Para fazer os testes via postman é necessario primeiro criar um usuário como cliente ou empresa da seguinte forma:

Rota: localhost:3000/registro-empresa

JSON: 
  {
    "razao_social": "the office",
    "responsavel": "Steve carrel",
    "email": "the.office@teste.com.br",
    "cnpj": "123456",
    "telefone": "12345678",
    "senha": "1234"
  }
  
  Rota: localhost:3000/registro-cliente
  
  JSON: 
    {
      "nome": "Jim harper",
      "email": "jim@teste.com",
      "cpf": "123456",
      "senha": "1234"
    }


E se autenticar

Rota: localhost:3000/autenticacao-cliente ou localhost:3000/autenticacao-empresa

JSON: {
    "email": "email@castrado.com",
    "senha": "1234"
}

