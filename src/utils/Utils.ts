export const getDateDifferenceInDays = (day1: Date, day2: Date): number => {
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInMilliseconds = day1.getTime() - day2.getTime();
  return Math.floor(diffInMilliseconds / oneDay);
};

export const getDateDifferenceInHours = (diffInMs: number): number => {
  return Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
};

export const getDateDifferenceInMinutes = (diffInMs: number): number => {
  return Math.floor((diffInMs / (1000 * 60)) % 60);
};

export const getDateDifferenceInSeconds = (diffInMs: number): number => {
  return Math.floor((diffInMs / 1000) % 60);
};
