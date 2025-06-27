export const getDateDifferenceInDays = (day1: Date, day2: Date): number => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInMilliseconds = day1.getTime() - day2.getTime();
    return Math.round(diffInMilliseconds / oneDay);
  };
  
  export const getDateDifferenceInHours = (day1: Date, day2: Date): number => {
    const oneHour = 1000 * 60 * 60;
    const diffInMilliseconds = day1.getTime() - day2.getTime();
    return Math.floor(diffInMilliseconds / oneHour);
  };
  
  