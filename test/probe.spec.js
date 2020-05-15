process.env.ENV = "test";
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require("dotenv");
const Application = require("../dist/app/index").Application;
const Database = require("../dist/config/database").Database;
const Faker = require("faker");

chai.use(chaiHttp);

describe("Main application specification test", () => {

    dotenv.config();

    let application;
    let database;
    let requester;
    let faker = Faker;

    before((done) => {
        database = new Database(Database.generateURI("test", "test", "test"));
        application = new Application(process.env.PORT, process.env.HOST);
        requester = chai.request(application.server).keepOpen();
        done();

    });

    it("Should register new user'.", (done) => {
        Promise.resolve(
            requester.get("/register")
                .send({
                    "username": faker.internet.userName(),
                    "email": faker.internet.email(),
                    "password": faker.internet.password(16),
                })
        ).then((response) => {
            console.log(response.body);
            done();
        });
    });

    after((done) => {
        requester.close();
        done();
    });

});
