// const request = require('supertest')
// const app = require('../../api')
// const { resetTestDB } = require('./config')

// describe('api server', () => {
//     let api;

//       beforeEach(async () => {
//         await resetTestDB()
//       })

//     beforeAll(() => {
//         api = app.listen(5000, () => {
//             console.log('🌕Test server running in port 5000')
//         })
//     })

//     afterAll((done) => {
//         // console.log('Gracefully stopping the test server')
//         api.close(done)
//     })

//     test('responds to GET / with status 200', (done) => {
//         request(api)
//             .get('/')
//             .expect(200, done)
//     })
//     test('responds to GET /goats with status 200', (done) => {
//         request(api)
//             .get('/goats')
//             .expect(200, done)
//     })
//     test('responds to invalid method request with 405', (done) => {
//         request(api).post('/').expect(405, done)
//     })
//     test('responds to DELETE /goats/:id with status 204', () => {
//         request(api).delete('/goats/1').expect(204)
//     })
//     test('responds to GET /goats/:id with a 200', () => {
//         request(api)
//             .get('/goats/3')
//             .expect(200)
//     })
//     test('responds to a unknown goat id with a 404', (done) => {
//         request(api)
//           .get('/goats/42')
//           .expect(404)
//           .expect({ error: 'This goat does not exist!' }, done)
//       })
//       test('responds to POST /goats with status 201', (done) => {
//         const testData = {
//           name: "Steph Curry",
//           age: new Date().getFullYear() - 1988
//         }
    
//         request(api)
//           .post('/goats')
//           .send(testData)
//           .set('Accept', 'application/json')
//           .expect(201)
//           .expect({ data: { ...testData, id: 4 } }, done)
//       })
// })