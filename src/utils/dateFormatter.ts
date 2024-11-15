const dateFormatChanger = (date: string) => {
  const dateArr = date.split('.');
  try {
    return `\`${dateArr[0].slice(2, 4)}.${dateArr[1]}`;
  } catch {}
  return null;
};

export default dateFormatChanger;
