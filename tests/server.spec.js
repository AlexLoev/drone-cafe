const supertest = require('supertest');
const expect = require('chai').expect;
const log = console.log;

describe('Server functionality', () => {
    let agent;
    let app;
    let mongoose;

    before(done => {
        app = require('../server/server');
        agent = supertest.agent(`http://localhost:${app.port}`);
        mongoose = require('../server/db/mongoose');
        done();
    });

    it('Answer for simple request to root "/"', done => {
        agent
            .get('/')
            .expect(200)
            .end(function (err, res) {
                err ? done(err) : done();
            });
    });

    it('MongoDB connected', done => {
        setTimeout(() => {
            expect(mongoose.connection.readyState).to.equal(1);
            done();
        }, 1900);
    });

    describe('Users API', () => {
        it('should return userlist on "GET \\users\\"', done => {
            agent
                .get('/users')
                .expect(200)
                .end(function (err, res) {
                    err ? done(err) : done();
                });
        });


        it('should create user on "POST \\users\\"', done => {
            agent
                .post('/users')
                .send({
                    name: "test",
                    email: "test@test"
                })
                .expect(200)
                .end(function (err, res) {
                    err ? done(err) : done();
                });
        });
        // it('should return 403 Forbidden by existing email on "POST \\users\\"', done => {
        //     agent
        //         .post('/users')
        //         .send({
        //             name: "test",
        //             email: "test@test"
        //         })
        //         .expect(403)
        //         .end(function (err, res) {
        //             err ? done(err) : done();
        //         });
        // });
        it('should remove users by email on "DELETE \\users\\test@test"', done => {
            agent
                .delete('/users/test@test')
                .expect(200)
                .end(function (err, res) {
                    err ? done(err) : done();
                });
        });

    });
    after(() => {
        app.httpServer.close();
        mongoose.connection.close();
    });
});

// [ { _id: 5ace0756db40b007f4bb64ac,
//     name: 'loev',
//     email: 'mm@mm',
//     __v: 0 },
//   { _id: 5ace07eff0905b2944250d15,
//     name: 'loev',
//     email: 'mm@mm',
//     __v: 0 } ]