# Repositório back end Task Scheduler.

# Sumário

- [Como funciona este projeto](#explicações-gerais)
- [Como rodar o projeto](#como-rodar-o-projeto)
  - [Rodando manualmente](#manual)
  - [Rodando através do Docker](#dockerized)
- [Testes e verificações](#testes-e-verificações)
  - [Rodando o lint (Futura pipeline)](#usando-o-lint)
  - [Rodando os testes de integração](#testes-de-integracao)

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
  - O melhor caminho para começar. Registre-se aqui com um email, senha e nome de usuário

  ```
  { 
    "nome": "Zézinho", 
    "email": "zeze@ze.com",
    "senha": "qualquercoisa123"
  }
  ```

- Post /login
  - Rota usada para logar no sistema. Retorna um token JWT. A senha estará segura e encriptada aqui!

  ```
  { 
    "email": "zeze@ze.com",
    "senha": "qualquercoisa123"
  }
  ```

- Get /get
  - Esta rota busca os dados de algum usuário registrado. É necessário o uso do token JWT no header "authorization";

- PUT /setTask
  - Aqui, o usuário registra sua tarefa, a data que a começou e o seu status de andamento
  ```
  {
  "task": "Fazer os testes da rota com os casos de transaction",
  "status": "pending",
  "date": "2022-12-12:2022-12-12T02:23:28.000Z"
  }
  ```

- PUT /updateTask
  - Aqui, o usuário atualiza ou modifica sua tarefa. É necessário informar o _id da tarefa que modificaremos.
  ```
  {
  "task": "Fazer os testes da rota com os casos de transaction",
  "status": "done",
  "date": "2022-12-12:2022-12-12T02:50:31.000Z"
  "taskId": "ID AQUI"
  }
  ```

- DEL /delTask
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