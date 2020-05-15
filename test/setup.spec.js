process.env.ENV = "test";
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require("dotenv");
const Application = require("../dist/app").Application;
const Database = require("../dist/config/database").Database;

chai.use(chaiHttp);

describe("Setup test configuration environment.", () => {
    dotenv.config();

    let application;
    let database;
    let requester;

    before((done) => {
        database = new Database(Database.generateURI("test", "test", "test"));
        application = new Application(process.env.PORT, process.env.HOST);
        requester = chai.request(application.server).keepOpen();
        done();

    });

   it("Should do one test specification", (done) => {
       Promise.resolve(
           requester.get("/info"),
       )
           .then((responses) => {
               chai.expect(responses.body.meta.status).to.be.equal(true);
               chai.expect(responses.body.response.message).to.be.equal("Default info");
               done();
           });
   });

   it("Should do last check specification", (done) => {
       Promise.resolve(
           requester.get("/users/list"),
       )
           .then((responses) => {
               chai.expect(responses.body.meta.status).to.be.equal(true);
               chai.expect(responses.body.response).to.be.a("object");
               chai.expect(responses.body.response.message).to.be.equal("Invalid token!");
               done();
           });

   });

   after((done) => {
       requester.close();
       done();
   });

});
