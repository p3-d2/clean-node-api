const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return { userModel, sut }
}

describe('UpdateAccessToken Repository', () => {
  let fakeUserId

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUserId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    await expect(sut.update(fakeUserId, 'any_token')).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut } = makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update('valid_id')).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
