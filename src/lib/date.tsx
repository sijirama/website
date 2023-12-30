import { format, formatDistance, subDays } from "date-fns";

export function MyDate(date: string) {
  const formattedDate = format(new Date(date), "eeee,  MMMM dd,  yyyy");
  return formattedDate;
}