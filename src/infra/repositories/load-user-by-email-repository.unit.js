const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MissingParamError } = require('../../utils/errors')

const makeSut = () => new LoadUserByEmailRepository()

describe('LoadUserByEmail Repository', () => {
  let db

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@gmail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@gmail.com')
    expect(user).toEqual({
      _id: fakeUser.insertedId,
      password: 'hashed_password'
    })
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    await expect(sut.load()).rejects.toThrow(new MissingParamError('email'))
  })
})
