/* eslint-disable no-unused-vars */
import request from 'supertest';
import app from './app';

describe('[/] 서버 접속', () => {
  it('', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (!err) done();
        else done(err);
      });
  });
});
