const chai = require("chai");
const server = require('../index');
const chaihttp = require("chai-http");
const { response } = require("../index");
const config = require('../config');

chai.should();
chai.use(chaihttp);

describe('Task Api', () => {

    // Test get archive files
    describe(`GET ${config.TEST_URL}archivedlist/:userid`, () => {
        it("It should get all the archived file of a user", (done) => {
            let userid = 1;
            chai.request(server)
                .get(`${config.TEST_URL}archivedlist/${userid}`)
                .end((err, response) => {
                    if (err) return done(err)
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                })
            done();
        });
    });

    // Test get unarchive files

    describe(`GET ${config.TEST_URL}archivedlist/:userid`, () => {
        it("It should get all the unarchived file of a user", (done) => {
            let userid = 5
            chai.request(server)
                .get(`${config.TEST_URL}unarchivedlist/${userid}`)
                .end((err, response) => {
                    if (err) return done(err)
                    response.body.should.be.a('array')
                    response.should.have.status(200);

                })
            done();
        })
    })

    // add a file
    describe(`POST ${config.TEST_URL}addText`, () => {
        it("It should add file to the db", (done) => {
            var body = {
                "userId": 20,
                "textBody": "testing body"
            }
            chai.request(server)
                .post(`${config.TEST_URL}addText`)
                .send(body)
                .end((err, response) => {
                    if (err) return done(err)
                    response.should.have.status(200);
                })
            done();
        });

            //add file with missing parameters
            it("It shouldnt add file to the db", (done) => {
                var body = {
                    "userId": 20,
                }
                chai.request(server)
                    .post(`${config.TEST_URL}addText`)
                    .send(body)
                    .end((err, response) => {
                        if(err) return done(err)
                        response.should.have.status(500);
                    })
                done();
            });
        });

          // archieve a file
          describe(`PUT ${config.TEST_URL}setArchieve/:id`, () => {
            it("It should add file to the db", (done) => {
                var body = {
                    "userId": 12,
                }
                let id = "5ff92929a900ac349845d7f4"
                chai.request(server)
                    .put(`${config.TEST_URL}setArchieve/${id}`)
                    .send(body)
                    .end((err, response) => {
                        if(err) return done(err)
                        response.should.have.status(200);
                    })
                done();
            });
    });


})
