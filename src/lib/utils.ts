import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formattedDate(date: Date | undefined) {
  const formattedDate = `${date?.getFullYear()}-${String(
    date?.getMonth()! + 1
  ).padStart(2, "0")}-${String(date?.getDate()).padStart(2, "0")}`;

  return formattedDate;
}

export function convertTimeToDate(
  time: FormDataEntryValue | null,
  currentDate: Date
) {
  const hours = Number(time?.slice(0, -3));
  const minutes = Number(time?.slice(-2));

  const date = new Date(currentDate);
  date.setHours(hours, minutes, 0, 0);

  date.setUTCHours(date.getUTCHours());
  const isoFormattedTimeTo = date.toISOString();

  console.log(isoFormattedTimeTo)
  return isoFormattedTimeTo;
}
