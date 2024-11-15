/* eslint-disable */
const isNotNull = (value: any) => {
  return value === null ? false : true;
};

const isNotZero = (value: any) => {
  return value === 0 ? false : true;
};

const isValidValue = (value: any) => {
  return value === undefined || value === null ? false : true;
};

const isValidValueAndNotZero = (value: any) => {
  return value === undefined || value === null || value === 0 ? false : true;
};

const isNumber = (value: any) => {
  if (Number.isNaN(Number(value))) {
    return false
  } else {
    return true
  }
}

const numberOrZero = (value: any) => {
  if (Number.isNaN(Number(value))) {
    return 0
  } else {
    return Number(value)
  }
}

export { isNotNull, isNotZero, isValidValue, isValidValueAndNotZero, isNumber, numberOrZero };
