// eslint-disable-next-line
const rounder = (param: any): string => {
  if (typeof param !== 'string') {
    return '';
  }
  if (Number(param)) {
    return Math.round(Number(param)).toString();
  } else {
    return '';
  }
};

// eslint-disable-next-line
const rounderNumber = (param: any): number | null => {
  if (typeof param !== 'number') {
    return null;
  }
  if (!Number.isNaN(Number(param))) {
    return Math.round(param);
  } else {
    return null;
  }
};

// eslint-disable-next-line
const rounderNumberTwo = (param: any): number | null => {
  if (typeof param !== 'number') {
    return null;
  }
  if (Number(param)) {
    return Number(Number(param).toFixed(2));
  } else {
    return null;
  }
};

export { rounder, rounderNumber, rounderNumberTwo };
