const supertest = require('supertest');
const expect = require('chai').expect;
const log = console.log;

describe('Server functionality', () => {
    let agent;
    let app;
    let mongoose;

    before(done => {
        app = require('../app/server');
        agent = supertest.agent(`http://localhost:${app.port}`);
        mongoose = require('../app/src/model/mongoose');
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
        it('should create users by post "\\users\\"', done => {
            agent
                .post('/users')
                .send({
                    name: "loev3",
                    email: "mm@mm"
                })
                .expect(200)
                .end(function (err, res) {
                    err ? done(err) : done();
                });
        });
        // it('should return userid by posting existing email on "\\users\\"', done => {
        //     agent
        //         .post('/users')
        //         .send({
        //             name: "loev",
        //             email: "mm@mm"
        //         })
        //         .expect(200)
        //         .end(function (err, res) {
        //             err ? done(err) : done();
        //         });
        // });
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