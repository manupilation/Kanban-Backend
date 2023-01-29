/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import { response } from "express";
import Sinon from "sinon";
import { app } from "../App.js";
import { RestartDb } from "./utils.js";
const expect = chai.expect;

const EXPIRED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTZiODRjYTEzMDczMmY3OGExYjE1ZCIsInVzZXIiOiJXaWxsIiwiZW1haWwiOiJXaWxsQHdpbGwuY29tIiwiaWF0IjoxNjcxMDUyMTY3LCJleHAiOjE2NzEwNzAxNjd9.dHuUuBukBXDOPpBjFdeHNZCkox5rB_suW4U6YhtT0ME";

chai.use(chaiHttp);

async function quickRegister() {
  const register = await chai.request(app)
    .post("/register")
    .set("Content-Type", "application/json")
    .send({
      user: "Mirio",
      password: "Miriozito",
      email: "mirio@mirio.com"
    });
  
  return register;
}

async function quickLogin() {
  const login = await chai.request(app)
    .post("/login")
    .set("Content-Type", "application/json")
    .send({
      email: "mirio@mirio.com",
      password: "Miriozito",
    });
  return login.body.token;
}

describe("Testes de integração das rotas:", () => {
  describe("Testa a rota /register:", () => {
    it("Em uma requisição correta:", async () => {
      const response = await chai.request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({
          user: "Gaspar",
          password: "Gasparzito",
          email: "gaspar@gaspar.com"
        });

      expect(response.body).to.contains({
        user: "Gaspar",
        email: "gaspar@gaspar.com"
      });

      expect(response.body._id).to.be.a("string");
      expect(response.status).to.be.eq(201);
    });

    it("Em uma requisição sem user:", async () => {
      const response = await chai.request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({
          password: "Gasparzito",
          email: "gaspar@gaspar.com"
        });

      expect(response.body.error).to.be.eq("Username is required");
      expect(response.status).to.be.eq(400);
    });

    it("Em uma requisição sem password:", async () => {
      const response = await chai.request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({
          user: "Gaspar",
          email: "gaspar@gaspar.com"
        });

      expect(response.body.error).to.be.eq("Password is required");
      expect(response.status).to.be.eq(400);
    });

    it("Em uma requisição sem email:", async () => {
      const response = await chai.request(app)
        .post("/register")
        .set("Content-Type", "application/json")
        .send({
          user: "Gaspar",
          password: "Gasparzito",
        });

      expect(response.body.error).to.be.eq("Email is required");
      expect(response.status).to.be.eq(400);
    });
  });

  

  describe("Testa a rota /login:", () => {
    it("Em um login correto:", async() => {
      const response = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          email: "gaspar@gaspar.com",
          password: "Gasparzito",
        });

      expect(response.body).to.contain.keys("token");
      expect(response.status).to.eq(200);
    });

    it("Em um login sem email:", async () => {
      const response = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          password: "Gasparzito",
        });

      expect(response.status).to.eq(400);
      expect(response.body.error).to.be.eq("Email is required");
    });

    it("Em um login sem senha:", async () => {
      const response = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          email: "gaspar@gaspar.com",
        });

      expect(response.status).to.eq(400);
      expect(response.body.error).to.be.eq("Password is required");
    });

    it("Em um login de email não cadastrado:", async () => {
      const response = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          email: "gespar@gaspar.com",
          password: "Gasparzito",
        });

      expect(response.status).to.eq(401);
      expect(response.body.error).to.be.eq("Email ou senha inválidos!");
    });

    it("Em um login de senha incorreta:", async () => {
      const response = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          email: "gaspar@gaspar.com",
          password: "Gasperzito",
        });

      expect(response.status).to.eq(401);
      expect(response.body.error).to.be.eq("Email ou senha inválidos!");
    });
  });

  describe("Testa a rota /get:", () => {
    it("Em uma requisição adequada:", async() => {
      const getToken = await chai.request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          email: "gaspar@gaspar.com",
          password: "Gasparzito",
        });

      const response = await chai.request(app)
        .get("/get")
        .set("Content-Type", "application/json")
        .set("authorization", getToken.body.token);

      expect(response.status).to.eq(200);
      expect(response.body).to.contain.keys("user", "id", "tasks");
    });

    it("Em uma requisição de token inválido:", async() => {
      const response = await chai.request(app)
        .get("/get")
        .set("Content-Type", "application/json")
        .set("authorization", "FAKEAUTHORIZATION");

      expect(response.body.error).to.eq("Token inválido!");
    });

    it("Em uma requisição de token expirado:", async() => {
      const response = await chai.request(app)
        .get("/get")
        .set("Content-Type", "application/json")
        .set("authorization", EXPIRED_TOKEN);

      expect(response.body.error).to.eq("Token expirado!");
    });
    
  });

  describe("Testes da rota /setTask:", () => {
    before(async () => {
      await quickRegister();
    });

    it("Em uma requisição correta:", async () => {
      const request = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "task": "Make a great sandwich",
          "status": "done",
          "date": "2022-12-12"
        });

      expect(request.status).to.eq(201);
      expect(request.body.tasks[0]).to.have.keys(["task", "date", "status", "_id"]);
    });

    it("Testa a requisição sem o campo TASK", async () => {
      const addWithoutTask = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "status": "done",
          "date": "2022-12-12"
        });

      expect(addWithoutTask.body.error).to.eq("Task is required");
    });

    it("Em uma requisição com task insuficiente:", async () => {
      const request = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "task": "M",
          "status": "done",
          "date": "2022-12-12"
        });

      expect(request.status).to.eq(422);
      expect(request.body.error).to.eq("Task must be longer than 5 characters");
    });

    it("Em uma requisição com task de tipo errado:", async () => {
      const request = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "task": 123456,
          "status": "done",
          "date": "2022-12-12"
        });

      expect(request.status).to.eq(422);
      expect(request.body.error).to.eq("Task must be a string");
    });

    it("Testa a requisição sem o campo Status", async () => {
      const addWithoutStatus = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "task": "Bend the space-time",
          "date": "2022-12-12"
        });

      expect(addWithoutStatus.body.error).to.eq("Status is required");
    });

    it("Testa a requisição sem o campo Date", async () => {
      const addWithoutDate = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", await quickLogin())
        .send({
          "task": "Bend the space-time",
          "status": "pending",
        });

      expect(addWithoutDate.body.error).to.eq("Date is required");
    });

    it("Testa a requisição sem token de validação", async () => {
      const addWithoutDate = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", "INVALID")
        .send({
          "task": "Bend the space-time",
          "status": "pending",
          "date": "2022-12-12"
        });

      expect(addWithoutDate.body.error).to.eq("Token inválido!");
    });

    it("Testa a requisição com token expirado", async () => {
      const addWithoutDate = await chai.request(app)
        .put("/setTask")
        .set("Content-Type", "application/json")
        .set("authorization", EXPIRED_TOKEN)
        .send({
          "task": "Bend the space-time",
          "status": "pending",
          "date": "2022-12-12"
        });

      expect(addWithoutDate.body.error).to.eq("Token expirado!");
    });
  });

  after(() => {
    RestartDb();
  });
});
