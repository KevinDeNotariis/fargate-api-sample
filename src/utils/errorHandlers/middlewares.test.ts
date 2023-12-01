import app from '../../app';
import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Error Middleware', () => {
    describe('Upon receiveing a wrongly formatted json as payload', () => {
        const res_prom = chai
            .request(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send('{"email": "hello@world.com", "password: "whatever"');

        it('Should correctly return a 400 saying that something went wrong', (done) => {
            res_prom.end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                res.body.message.toLowerCase().should.match(/something went wrong/);
                done();
            });
        });
    });

    describe("Upon requesting a route that doesn't exists", () => {
        const res_prom = chai.request(app).post('/non-existent-route').send();

        it('Should return a 404 with a "not found" message', (done) => {
            res_prom.end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message');
                res.body.message.toLowerCase().should.match(/not found/);
                done();
            });
        });
    });
});
