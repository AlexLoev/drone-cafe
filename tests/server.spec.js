const supertest = require('supertest');
const expect = require('chai').expect;
const log = console.log;

describe('Server functionality', () => {
    let agent;
    let app;

    before(done => {
        app = require('../app/server');
        agent = supertest.agent(`http://localhost:${app.port}`);
        done();
    });

    it('Answer for simple request to root "/"', done => {
        agent
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err
                } else {
                    done();
                };
            });
    });
    after(() => {
        app.httpServer.close();
    });
});