import { isArray, isNonEmptyArray, isObject, isNonNullObject, isEmail } from './validator';
describe('Validator tests', () => {
  describe('array tests', () => {
    test('should validate empty array', () => {
      const array = [];
      expect(isArray(array)).toBeTruthy();
    });
    test('should validate array', () => {
      const array = [1];
      expect(isArray(array)).toBeTruthy();
    });
    test('should validate non empty array', () => {
      const array = [1];
      expect(isNonEmptyArray(array)).toBeTruthy();
    });
    test('should not validate empty object', () => {
      const array = {};
      expect(isArray(array)).toBeFalsy();
    });
  });
  describe('object tests', () => {
    test('should validate empty object', () => {
      const object = {};
      expect(isObject(object)).toBeTruthy();
    });
    test('should validate object', () => {
      const object = { val1: {} };
      expect(isObject(object)).toBeTruthy();
    });
    test('should validate non empty object', () => {
      const object = { val1: {} };
      expect(isNonNullObject(object)).toBeTruthy();
    });
    test('should not validate empty object', () => {
      const array = {};
      expect(isArray(array)).toBeFalsy();
    });
  });
  describe('email tests', () => {
    test('should validate valid email', () => {
      const email = 'email@email.extension';
      expect(isEmail(email)).toBeTruthy();
    });
    test('should invalidate invalid email', () => {
      const email = 'email@emailextension';
      expect(isEmail(email)).toBeFalsy();
    });
  });
});
