export const convertMillisecondsToDays = (timeInMilliseconds: number): number => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(timeInMilliseconds / oneDay);
};

export const convertMillisecondsToHours = (diffInMs: number): number => {
  return Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
};

export const convertMillisecondsToMinutes = (diffInMs: number): number => {
  return Math.floor((diffInMs / (1000 * 60)) % 60);
};

export const convertMillisecondsToSeconds = (diffInMs: number): number => {
  return Math.floor((diffInMs / 1000) % 60);
};
