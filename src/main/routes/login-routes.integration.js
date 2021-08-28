const request = require('supertest')
const app = require('../config/app')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../infra/helpers/mongo-helper')

describe('Login Routes', () => {
  let userModel

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid credentials are provided', async () => {
    await userModel.insertOne({
      email: 'any_email@email.com',
      password: await bcrypt.hash('any_password', 8)
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'any_email@email.com',
        password: 'any_password'
      })
      .expect(200)
  })

  test('Should return 401 when invalid credentials are provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      })
      .expect(401)
  })
})
