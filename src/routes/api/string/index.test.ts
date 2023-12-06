import app from '../../../app';
import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('api/string', () => {
    describe('/replace', () => {
        const sendRequest = (content: string) => {
            return chai
                .request(app)
                .post('/api/string/replace')
                .set('Content-Type', 'application/json')
                .set('x-api-key', 'helloworld')
                .send(`{"content": "${content}"}`);
        };

        it('Should return a 400 Malformed input if the body does not contain the "content" attribute', (done) => {
            const chaiProm = chai
                .request(app)
                .post('/api/string/replace')
                .set('Content-Type', 'application/json')
                .set('x-api-key', 'helloworld')
                .send(`{"hello": "random"}`);

            chaiProm.end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('Malformed Input');
                done();
            });
        });

        it('Should return a 400 Malformed input if the value of the "content" key is not a string', (done) => {
            const chaiProm = chai
                .request(app)
                .post('/api/string/replace')
                .set('Content-Type', 'application/json')
                .set('x-api-key', 'helloworld')
                .send(`{"content": {"yo": "yo"}}`);

            chaiProm.end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('Malformed Input');
                done();
            });
        });

        it('Should return an empty string if an empty string is provided', (done) => {
            sendRequest('').end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal('');
                done();
            });
        });

        it('Should correctly replace one string occurence in the content', (done) => {
            sendRequest('abn is great!').end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal('ABN AMRO is great!');
                done();
            });
        });

        it('Should correctly replace two string occurences in the content', (done) => {
            sendRequest('abn is great! And also rabo').end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal('ABN AMRO is great! And also Rabobank');
                done();
            });
        });

        it('Should correctly replace two string occurences of the same type in the content', (done) => {
            sendRequest('abn is great! I like abn').end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal('ABN AMRO is great! I like ABN AMRO');
                done();
            });
        });

        it('Should correctly replace a string occurence with random casing', (done) => {
            sendRequest('raBo is my bank').end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal('Rabobank is my bank');
                done();
            });
        });

        it('Should correctly replace all possible string occurences from the map', (done) => {
            sendRequest(
                'The following is a list of good banks: RaBo, Abn, ING, TrIoDos, VolksBank'
            ).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                res.body.message.should.equal(
                    'The following is a list of good banks: Rabobank, ABN AMRO, ING BANK, Triodos Bank, de Volksbank'
                );
                done();
            });
        });
    });
});
