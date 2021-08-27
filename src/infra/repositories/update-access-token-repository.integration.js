const MongoHelper = require('../helpers/mongo-helper')

let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          accessToken
        }
      }
    )
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return { userModel, sut }
}

describe('UpdateAccessToken Repository', () => {
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

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@gmail.com',
      password: 'hashed_password'
    })
    await expect(sut.update(fakeUser.insertedId, 'any_token')).rejects.toThrow()
  })
})
