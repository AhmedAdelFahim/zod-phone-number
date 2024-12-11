import { RefinementCtx, z, ZodError, ZodFirstPartyTypeKind } from 'zod';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js/mobile';

export enum RETURNING_FORMAT {
  ORIGINAL = 'ORIGINAL',
  FORMATTED_VALUE = 'FORMATTED_VALUE',
  NATIONAL = 'NATIONAL',
  INTERNATIONAL = 'INTERNATIONAL',
  'E.164' = 'E.164',
  RFC3966 = 'RFC3966',
  VALUE_WITH_EXTRA_INFO = 'VALUE_WITH_EXTRA_INFO',
}

class ZodPhoneNumber extends z.ZodString {
  constructor() {
    super({ typeName: ZodFirstPartyTypeKind.ZodString, checks: [], coerce: false });
  }
  phoneNumber(options?: any) {
    return this.refine(
      (value) => {
        const parsedNumber = parsePhoneNumberFromString(value);
        return parsedNumber && parsedNumber.country && isValidPhoneNumber(value, parsedNumber.country);
      },
      {
        message: 'Invalid phone number',
      },
    ).transform((value, ctx: RefinementCtx) => {
      try {
        const returningFormat: RETURNING_FORMAT = options?.returningFormat || RETURNING_FORMAT.ORIGINAL;
        const parsedNumber = parsePhoneNumberFromString(value);
        if (!parsedNumber) {
          throw new ZodError([]);
        }
        switch (returningFormat) {
          case RETURNING_FORMAT.FORMATTED_VALUE:
            return parsedNumber.number;
          case RETURNING_FORMAT.VALUE_WITH_EXTRA_INFO:
            return {
              originalValue: value,
              nationalNumber: parsedNumber.nationalNumber,
              formattedNumber: parsedNumber.number,
              countryCode: parsedNumber.country,
              countryCallingCode: parsedNumber.countryCallingCode,
            };
          case RETURNING_FORMAT.NATIONAL:
          case RETURNING_FORMAT.INTERNATIONAL:
          case RETURNING_FORMAT['E.164']:
          case RETURNING_FORMAT.RFC3966:
            return parsedNumber.format(returningFormat);
          default:
            return value;
        }
      } catch (e) {
        ctx.addIssue({
          message: 'Invalid phone number',
          code: 'custom',
        });
      }
    });
  }
}

export default new ZodPhoneNumber();
