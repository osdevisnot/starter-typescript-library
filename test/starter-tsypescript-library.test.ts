import DummyClass from '../src/starter-tsypescript-library'

describe('starter-typescript-library tests', () => {
  it('works if try is trythy', () => {
    expect(true).toBeTruthy()
  })
  it('can create instance', () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })
})
