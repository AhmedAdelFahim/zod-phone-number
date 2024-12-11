import assert from 'assert';
import { ZodPhoneNumber, RETURNING_FORMAT } from '..';
import { z } from 'zod';

describe('Zod Phone Number Testing', function () {
  describe('valid numbers testing', function () {
    it('Should get NATIONAL formatted number with complex schema.', async function () {
      const schema = z.object({
        phone: ZodPhoneNumber.phoneNumber({
          returningFormat: RETURNING_FORMAT.NATIONAL,
        }),
      });
      const result = schema.safeParse({
        phone: '+2010 605 944 77',
      });
      assert.deepEqual(result, {
        data: {
          phone: '010 60594477',
        },
        success: true,
      });
    });

    it('Should get NATIONAL formatted number.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.NATIONAL,
      }).safeParse('+2010 605 944 77');
      assert.deepEqual(result, {
        data: '010 60594477',
        success: true,
      });
    });

    it('Should get INTERNATIONAL formatted number.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.INTERNATIONAL,
      }).safeParse('+2010 605 944 88');
      assert.deepEqual(result, {
        data: '+20 10 60594488',
        success: true,
      });
    });

    it('Should get ORIGINAL number.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.ORIGINAL,
      }).safeParse('+966 55 7777777');
      assert.deepEqual(result, {
        data: '+966 55 7777777',
        success: true,
      });
    });

    it('Should get formatted number without space.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.FORMATTED_VALUE,
      }).safeParse('+2010 605 944 88');
      assert.deepEqual(result, {
        data: '+201060594488',
        success: true,
      });
    });

    it('Should get E.164 formatted number.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT['E.164'],
      }).safeParse('+2010 605 944 88');
      assert.deepEqual(result, {
        data: '+201060594488',
        success: true,
      });
    });

    it('Should get RFC3966 formatted number.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.RFC3966,
      }).safeParse('+2010 605 944 88');
      assert.deepEqual(result, {
        data: 'tel:+201060594488',
        success: true,
      });
    });

    it('Should get VALUE_WITH_EXTRA_INFO.', async function () {
      const result = ZodPhoneNumber.phoneNumber({
        returningFormat: RETURNING_FORMAT.VALUE_WITH_EXTRA_INFO,
      }).safeParse('+2010 605 944 88');
      assert.deepEqual(result, {
        data: {
          countryCode: 'EG',
          formattedNumber: '+201060594488',
          nationalNumber: '1060594488',
          originalValue: '+2010 605 944 88',
          countryCallingCode: '20',
        },
        success: true,
      });
    });
  });

  describe('invalid numbers testing', function () {
    it('Should get error (invalid carrier code).', async function () {
      const { success, error } = ZodPhoneNumber.phoneNumber().safeParse('+2018 605 944 88');
      assert.equal(success, false);
      assert.deepEqual(error?.errors, [{ code: 'custom', message: 'Invalid phone number', path: [] }]);
    });

    it('Should get error (invalid length).', async function () {
      const { success, error } = ZodPhoneNumber.phoneNumber().safeParse('+2010 605 944 7');
      assert.equal(success, false);
      assert.deepEqual(error?.errors, [{ code: 'custom', message: 'Invalid phone number', path: [] }]);
    });

    it('Should get error (invalid country code).', async function () {
      const { success, error } = ZodPhoneNumber.phoneNumber().safeParse('+3010 605 944 7');
      assert.equal(success, false);
      assert.deepEqual(error?.errors, [{ code: 'custom', message: 'Invalid phone number', path: [] }]);
    });
  });
});
