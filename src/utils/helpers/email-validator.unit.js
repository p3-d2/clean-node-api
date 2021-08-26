const validator = require('validator')
const { MissingParamError } = require('../errors')
const EmailValidator = require('./email-validator')

const makeSut = () => new EmailValidator()

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@email.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const email = 'any_email@email.com'
    const sut = makeSut()
    sut.isValid(email)
    expect(validator.email).toBe(email)
  })

  test('Should throw if no email is provided', () => {
    const sut = makeSut()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
