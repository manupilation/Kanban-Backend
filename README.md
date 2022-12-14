# Repositório back end Task Scheduler.

# Sumário

- [Pré-requisitos](#pré-requisitos)
- [Como funciona este projeto](#explicações-gerais)
- [Como rodar o projeto](#como-rodar-o-projeto)
  - [Rode manualmente](#manual)
  - [Rode através do Docker](#dockerized)
- [Testes e verificações](#testes-e-verificações)
  - [Avalie o lint (Futura pipeline)](#usando-o-lint)
  - [Testes de integração](#testes-de-integração)
  
# Pré-requisitos

Para que o projeto funcione sem problemas, você precisa ter:

- [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm);
- [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git);
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ou [Yarn](https://yarnpkg.com/getting-started/install);
- [mongoDb](https://www.mongodb.com/docs/manual/administration/install-on-linux/);
- Algum API Client ([Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/));

Use algum programa shell (ou linha de comando) para criar um novo diretório em sua máquina:
```
mkdir kanbanScheduler
```

Navegue para dentro deste diretório e realize o clone do repositório:

```
cd kanbanScheduler
```

```
git clone git@github.com:manupilation/Kanban-Backend.git
```



# Explicações gerais

O propósito deste projeto é gerenciar um app de tarefas ao estilo "Kanban". O sistema de usuários visa a não interação entre dados de usuários distintos.
As stacks utilizadas nele são:

- Express
- Mongoose (MongoDb)
- Chai, Sinon e Mocha (Chai HTTP) para testes
- Eslint
- JWT para verificação
- Joi para validação

A Api conta com as seguintes rotas:

- Post /register
  - http://localhost:3001/register
  - O melhor caminho para começar. Registre-se aqui com um email, senha e nome de usuário

  ```
  { 
    "nome": "Zézinho", 
    "email": "zeze@ze.com",
    "senha": "qualquercoisa123"
  }
  ```

- Post /login
  - http://localhost:3001/login
  - Rota usada para logar no sistema. Retorna um token JWT. A senha estará segura e encriptada aqui!

  ```
  { 
    "email": "zeze@ze.com",
    "senha": "qualquercoisa123"
  }
  ```

- Get /get
  - http://localhost:3001/get
  - Esta rota busca os dados de algum usuário registrado. É necessário o uso do token JWT no header "authorization"; Um token é gerado no login.
 

- PUT /setTask
  - http://localhost:3001/setTask
  - Aqui, o usuário registra sua tarefa, a data que a começou e o seu status de andamento
  ```
  {
  "task": "Fazer os testes da rota com os casos de transaction",
  "status": "pending",
  "date": "2022-12-12:2022-12-12T02:23:28.000Z"
  }
  ```

- PUT /updateTask
  - http://localhost:3001/updateTask
  - Aqui, o usuário atualiza ou modifica sua tarefa. É necessário informar o _id da tarefa que modificaremos.
  ```
  {
  "task": "Fazer os testes da rota com os casos de transaction",
  "status": "done",
  "date": "2022-12-12:2022-12-12T02:50:31.000Z"
  "taskId": "ID AQUI"
  }
  ```

- DELETE /delTask
  - http://localhost:3001/delTask
  - A task é apagada da lista! Basta apenas informar o ID da task.
  ```
  {
  "taskId": "ID AQUI"
  }
  ```


# Como rodar o projeto

<details close>
  <summary id="manual">Manualmente</summary>
  <br>

  > Rode o seguinte comando

  ```
  npm install
  ```

  Crie um arquivo .env e preencha com as seguintes variáveis:

  ```
  DB_PORT=3001
  DB_URI=mongodb://localhost:27017/kanbanScheduler
  JWT_SECRET=closeandgapfindlover
  ```

  ```
  npm start
  ```

Pronto! a API está funcionando na sua porta 3001.
</details>

  <br>


<details close>
  <summary id="dockerized">Através do docker (em breve)</summary>
  <br>
</details>

---

# Testes e verificações

### Usando o Lint

  Para usar o lint, este é o comando:
  ```
    npm run lint
  ```

### Testes de integração

  Para os testes, use o comando:
  ```
    npm run lint
  ```
