class DateFormatter {
  date: Date;
  constructor(date: string) {
    this.date = new Date(date);
  }

  static toYYMM(input: string) {
    const dateArr = input.split('.');
    try {
      return `\`${dateArr[0].slice(2, 4)}.${dateArr[1]}`;
    } catch {}
    return null;
  }

  toYYMM() {
    return `${this.date.getFullYear.toString().slice(2, 4)}.${this.date.getMonth()}`;
  }
}

const dateFormatChanger = (date: string) => {
  const dateArr = date.split('.');
  try {
    return `\`${dateArr[0].slice(2, 4)}.${dateArr[1]}`;
  } catch {}
  return null;
};

export { DateFormatter, dateFormatChanger };
