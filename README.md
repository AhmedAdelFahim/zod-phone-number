# Zod Phone Number

Zod Phone Number is validation schema for [Zod](https://www.npmjs.com/package/zod).

[![Latest Stable Version](https://img.shields.io/npm/v/zod-phone-number.svg?style=for-the-badge)](https://www.npmjs.com/package/zod-phone-number)
[![License](https://img.shields.io/npm/l/zod-phone-number.svg?style=for-the-badge)](https://www.npmjs.com/package/zod-phone-number)
[![NPM Downloads](https://img.shields.io/npm/dt/zod-phone-number.svg?style=for-the-badge)](https://www.npmjs.com/package/zod-phone-number)
[![NPM Downloads](https://img.shields.io/npm/dm/zod-phone-number.svg?style=for-the-badge)](https://www.npmjs.com/package/zod-phone-number)

## Installation

```bash
$ npm i zod-phone-number
```

## Usage

```javascript
const { ZodPhoneNumber, RETURNING_FORMAT } = require('zod-phone-number');

const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.NATIONAL,
}).safeParse('+2010 605 944 77'); // 010 60594488


const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.INTERNATIONAL,
}).safeParse('+2010 605 944 88'); // +20 10 60594488

const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.ORIGINAL,
}).safeParse('+2010 605 944 88'); // +2010 605 944 88

const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.FORMATTED_VALUE,
}).safeParse('+2010 605 944 88'); // +201060594488

const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.RFC3966,
}).safeParse('+2010 605 944 88'); // tel:+201060594488

const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT['E.164'],
}).safeParse('+2010 605 944 88'); // +201060594488


const { data } = ZodPhoneNumber.phoneNumber({
  returningFormat: RETURNING_FORMAT.VALUE__WITH_EXTRA_INFO,
}).safeParse('+2010 605 944 88');
/*
output: {
        countryCode: 'EG',
        formattedNumber: '+201060594488',
        nationalNumber: '1060594488',
        originalValue: '+2010 605 944 88',
        countryCallingCode: '20',
      }
*/
```

## Tests

To run the test suite, first install the dependencies then run `npm test`:

```bash
$ npm install
$ npm test
```

## Support

Feel free to open issues on [github](https://github.com/AhmedAdelFahim/zod-phone-number).
