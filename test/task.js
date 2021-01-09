var chai = require("chai");
var server = require('../index');
var chaihttp = require("chai-http");
const { response } = require("../index");

//Assertion style
chai.should();

chai.use(chaihttp);

describe('Task Api', () => {

    // Test get archive files

    describe("GET /api/v1/textFile/archivedlist/:userid", () => {
        it("It should get all the archived file of a user", (done) => {
            let userid = 1;
            chai.request(server)
                .get("/api/v1/textFile/archivedlist/" + userid)
                .end((err, response) => {
                    if(err) return done(err)
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                })
            done();
        });
    });

    // Test get unarchive files

    describe("GET /api/v1/textFile/unarchivedlst/:userid", () => {
        it("It should get all the archived file of a user", (done) => {
            let userid = 5
            chai.request(server)
                .get("/api/v1/textFile/unarchivedlist/" + userid)
                .end((err, response) => {
                    if(err) return done(err)
                    response.body.should.be.a('array')
                    response.should.have.status(200);

                })
            done();
        })
    })

    // add a file
    describe("POST /api/v1/textFile/addText", () => {
        it("It should add file to the db", (done) => {
            var body = {
                "userId": 20,
                "textBody": "testing body"
            }
            chai.request(server)
                .post("/api/v1/textFile/addText")
                .send(body)
                .end((err, response) => {
                    if(err) return done(err)
                    response.should.have.status(200);
                })
            done();
        });

        //add file with missing parameters
        it("It should add file to the db", (done) => {
            var body = {
                "userId": 20,
            }
            chai.request(server)
                .post("/api/v1/textFile/addText")
                .send(body)
                .end((err, response) => {
                    if(err) return done(err)
                    response.should.have.status(500);
                })
            done();
        });
    });

      // archieve a file
      describe("PUT /api/v1/textFile/setArchieve/:id", () => {
        it("It should add file to the db", (done) => {
            var body = {
                "userId": 12,
            }
            let id = "5ff92929a900ac349845d7f4"
            chai.request(server)
                .put(`/api/v1/textFile/setArchieve/${id}`)
                .send(body)
                .end((err, response) => {
                    if(err) return done(err)
                    response.should.have.status(200);
                })
            done();
        });
    });


})
