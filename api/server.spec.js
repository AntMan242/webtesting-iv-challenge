const request = require('supertest');
const server = require('./server.js');

describe("the test module", () => {
    describe("the create endpoint", () => {
       it ("should return 201 when data is valid", async () => {
   
           const res = await request(server)
             .post("/api/heroes")
             .send({ heroName: "Bats" });
   
           expect(res.status).toBe(201);
       });
       it ("should return 400 when data is invalid", async () => {
   
           const res = await request(server)
             .post("/api/heroes")
             .send({ wrongData: "Supes" });
           expect(res.status).toBe(400);
       });
   
        it("should return a heroes id ", async () => {
           const res = await request(server)
             .post("/api/heroes")
             .send({ heroName: 'Diana'});
           expect(res.body.length).toBe(1);
       });
   });
   
    describe("the delete endpoint", () => {
       it ("should return status 200 and id 1 ", async () => {
           const res = await request(server)
             .delete("/api/heroes/1");
   
           expect(res.status).toBe(200);
           expect(res.body).toBe(1);
       });
   
       it ("should return 404 when hero does not exist", async () => {
           const res = await request(server)
           .delete("/api/heroes/5");
   
           expect(res.status).toBe(404);
       });
   })
   });