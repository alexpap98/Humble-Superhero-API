const request = require('supertest');
const data = require('../data.json');
const { app, server } = require('../app');



//close server after tests
afterAll(() => {
    server.close();
});

//function to insert heroes
function inserthero(name, power, score, status) {
    return it('POST superhero', async () => {
        const res = await request(app)
            .post(`/superheroes`)
            .send({
                "name": name,
                "superpower": power,
                "humility score": score
            });

        expect(res.status).toBe(status);
    });
}
//get data from json and run the tests (expecting 200)
describe.each(data.correct_heroes.map(hero => [
    hero.name,
    hero.superpower,
    hero['humility score']
]))('hero: %s', (name, superpower, humility) => {
    inserthero(name, superpower, humility, 200);
});

//get data from json and run the tests (expecting to fail 400)
describe.each(data.wrong_heroes.map(hero => [
    hero.name,
    hero.superpower,
    hero['humility score']
]))('hero: %s', (name, superpower, humility) => {
    inserthero(name, superpower, humility, 400);
});


//we run the tests with --runInBand so they will run sequentially and then we can get the heroes we have imported 
it('get heroes', async () => {
    const res = await request(app)
        .get(`/superheroes`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(5);
    res.body.forEach(hero => {
        expect(hero).toHaveProperty('name');
        expect(hero).toHaveProperty('superpower');
        expect(hero).toHaveProperty('humility score');
    });
});