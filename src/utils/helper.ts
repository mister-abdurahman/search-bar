import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export const calculateDateDifference = (
  dateString1: string | Date,
  dateString2: string | Date
) => {
  // Parse the date strings into Date objects
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the absolute difference in days, weeks, and months
  const daysDifference = Math.abs(differenceInDays(date2, date1));
  const weeksDifference = Math.abs(differenceInWeeks(date2, date1));
  const monthsDifference = Math.abs(differenceInMonths(date2, date1));

  // Determine the appropriate unit (days, weeks, or months)
  if (daysDifference < 7) {
    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""}`;
  } else if (weeksDifference < 4) {
    return `${weeksDifference} week${weeksDifference !== 1 ? "s" : ""}`;
  } else {
    return `${monthsDifference} month${monthsDifference !== 1 ? "s" : ""}`;
  }
};

export const isMonday = (date: Date) => {
  return date.getDay() === 1;
};
export const isSunday = (date: Date) => {
  return date.getDay() === 0;
};
