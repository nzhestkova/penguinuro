export function stringDateTime(date: Date): string {
  const datetime = new Date(date);
  const now = new Date();
  const today = datetime.getDate() === now.getDate();
  const thisYear = datetime.getFullYear() === now.getFullYear();
  return today
    ? `${datetime.getHours()}:${datetime.getMinutes()}`
    : thisYear
      ? `${datetime.getDate()} ${monthConverter(datetime.getMonth() + 1)}`
      : `${datetime.getDate()} ${monthConverter(datetime.getMonth() + 1)} ${datetime.getFullYear()}`;
}

export function strictDateTime(date: Date): string {
  const datetime = new Date(date);
  return `
  ${checkDateSize(datetime.getDate())}.${checkDateSize(datetime.getMonth() + 1)}.${datetime.getFullYear()}
   ${checkDateSize(datetime.getHours())}:${checkDateSize(datetime.getMinutes())}`;
}

function checkDateSize(date: number): string {
  return date < 10 ? `0${date}` : `${date}`;
}

function monthConverter(num: number): string {
  switch (num) {
    case 1: {
      return "января";
    }
    case 2: {
      return "февраля";
    }
    case 3: {
      return "марта";
    }
    case 4: {
      return "апреля";
    }
    case 5: {
      return "мая";
    }
    case 6: {
      return "июня";
    }
    case 7: {
      return "июля";
    }
    case 8: {
      return "августа";
    }
    case 9: {
      return "сентября";
    }
    case 10: {
      return "октября";
    }
    case 11: {
      return "ноября";
    }
    case 12: {
      return "декабря";
    }
    default: {
      return "???";
    }
  }
}
