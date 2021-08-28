jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  sign (payload, secret) {
    this.payload = payload
    this.secret = secret
    return this.token
  }
}))

const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')
const TokenGenerator = require('./token-generator')

const makeSut = () => new TokenGenerator('secret')

describe('Token Generator', () => {
  test('Should return null if JWT return null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return a token if JWT return token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.secret).toBe(sut.secret)
    expect(jwt.payload).toEqual({
      _id: 'any_id'
    })
  })

  test('Should throw if no secret is provided', async () => {
    const sut = new TokenGenerator()
    await expect(sut.generate('any_id')).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', async () => {
    const sut = makeSut()
    await expect(sut.generate()).rejects.toThrow(new MissingParamError('id'))
  })
})
