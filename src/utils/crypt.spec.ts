import crypt from './crypt';
describe('Crypt tests', () => {
  let sut: { encrypt; decrypt };
  beforeEach(() => {
    sut = crypt('some random key');
  });
  test('it decrypt back to same message', () => {
    const message = 'message';
    const encrypted = sut.encrypt(message);
    const decrypted = sut.decrypt(encrypted);
    expect(message).toEqual(decrypted);
  });
});
