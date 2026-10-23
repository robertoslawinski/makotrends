const nextWeekdayAtUtc = (from, weekday, hour) => {
  const date = new Date(from);
  const daysAhead = (weekday - date.getUTCDay() + 7) % 7;

  date.setUTCDate(date.getUTCDate() + daysAhead);
  date.setUTCHours(hour, 0, 0, 0);

  if (date <= from) {
    date.setUTCDate(date.getUTCDate() + 7);
  }

  return date;
};

export const getNextWeeklySchedule = (from = new Date()) => {
  const deadline = nextWeekdayAtUtc(from, 5, 18);
  const resolutionDate = new Date(deadline);
  resolutionDate.setUTCDate(resolutionDate.getUTCDate() + 1);
  resolutionDate.setUTCHours(12, 0, 0, 0);

  return { deadline, resolutionDate };
};

export const toDatetimeLocalValue = (value) => {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export const formatDeadlineUtc = (value) =>
  `${new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  }).format(new Date(value))} UTC`;
