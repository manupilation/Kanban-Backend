/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";
import { app } from "../App.js";
const expect = chai.expect;

chai.use(chaiHttp);

describe("Testes de integração das rotas", () => {
  describe("Testa a rota /register", () => {
    it("Em uma requisição correta", async () => {
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

    it("Em uma requisição sem user", async () => {
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

    it("Em uma requisição sem password", async () => {
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

    it("Em uma requisição sem email", async () => {
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

  

  describe("Testa a rota /login", () => {
    it("Em um login correto", async() => {
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
  });

  describe("Testa a rota /get", () => {
    it("Em uma requisição adequada", async() => {
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
  });
});
