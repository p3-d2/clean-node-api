const jwt = require('jsonwebtoken')
class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

const makeSut = () => new TokenGenerator()

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
})
