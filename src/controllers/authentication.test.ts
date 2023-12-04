import app from '../app';
import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Authentication Middleware', () => {
    describe('Upon receiving a request without an API key', () => {
        const resProm = chai
            .request(app)
            .post('/api/string/replace')
            .set('Content-Type', 'application/json')
            .send('{"content": "abn is a great bank"}');

        it('Should correctly return a 401 Forbidden', (done) => {
            resProm.end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('message');
                res.body.message.toLowerCase().should.match(/forbidden/);
                done();
            });
        });
    });
});
