import app from '../../app';
import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Error Middleware', () => {
    describe('Upon receiveing a wrongly formatted json as payload', () => {
        const resProm = chai
            .request(app)
            .post('/string/replace')
            .set('Content-Type', 'application/json')
            .send('{"content": "abn is a great bank"');

        it('Should correctly return a 400 saying that something went wrong', (done) => {
            resProm.end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                res.body.message.toLowerCase().should.match(/something went wrong/);
                done();
            });
        });
    });

    describe("Upon requesting a route that doesn't exists", () => {
        const resProm = chai.request(app).post('/non-existent-route').send();

        it('Should return a 404 with a "not found" message', (done) => {
            resProm.end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message');
                res.body.message.toLowerCase().should.match(/not found/);
                done();
            });
        });
    });
});
