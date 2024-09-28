import { expect } from 'chai';
import { Validator } from '../src/utils/validator.js';

describe('Validator', () => {
  let validator: Validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('validateBook', () => {
    it('should validate a valid book', () => {
      const formData = new FormData();
      formData.append('name', 'Test Book');
      formData.append('author', 'Test Author');
      formData.append('year', '2023');
      expect(validator.validateBook(formData)).to.be.true;
    });

    it('should invalidate a book with missing fields', () => {
      const formData = new FormData();
      formData.append('name', 'Test Book');
      formData.append('year', '2023');
      expect(validator.validateBook(formData)).to.be.false;
    });

    it('should invalidate a book with invalid year', () => {
      const formData = new FormData();
      formData.append('name', 'Test Book');
      formData.append('author', 'Test Author');
      formData.append('year', '202');
      expect(validator.validateBook(formData)).to.be.false;
    });
  });

  describe('validateUser', () => {
    it('should validate a valid user', () => {
      const formData = new FormData();
      formData.append('name', 'Test User');
      formData.append('email', 'test@example.com');
      formData.append('year', '1990');
      expect(validator.validateUser(formData)).to.be.true;
    });

    it('should invalidate a user with missing fields', () => {
      const formData = new FormData();
      formData.append('name', 'Test User');
      formData.append('year', '1990');
      expect(validator.validateUser(formData)).to.be.false;
    });

    it('should invalidate a user with invalid year', () => {
      const formData = new FormData();
      formData.append('name', 'Test User');
      formData.append('email', 'test@example.com');
      formData.append('year', '19');
      expect(validator.validateUser(formData)).to.be.false;
    });
  });

  describe('isYearValid', () => {
    it('should validate a valid year', () => {
      expect(validator.isYearValid('2023')).to.be.true;
    });

    it('should invalidate a year with less than 4 digits', () => {
      expect(validator.isYearValid('202')).to.be.false;
    });

    it('should invalidate a year with more than 4 digits', () => {
      expect(validator.isYearValid('20233')).to.be.false;
    });

    it('should invalidate a non-numeric year', () => {
      expect(validator.isYearValid('abcd')).to.be.false;
    });

    it('should invalidate a future year', () => {
      expect(validator.isYearValid('2025')).to.be.false;
    });
  });
});
