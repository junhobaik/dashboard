const app = require("./app.js");
const request = require("supertest");

describe("[/] 서버 접속", () => {
  it("", done => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (!err) done();
        else done(err);
      });
  });
});
