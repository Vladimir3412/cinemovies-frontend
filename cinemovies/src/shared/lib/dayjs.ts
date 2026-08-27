import dayjs from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  DATE_MONTH_DEFAULT_FORMAT,
  DATE_YEAR_DEFAULT_FORMAT,
  DATE_FULL_DEFAULT_FORMAT,
} from "@/shared/config/";

dayjs.locale("ru");
dayjs.extend(customParseFormat);

export const dayjsInstance = dayjs;

export const FORMAT_DATETIME = (dateISO: string): string => {
  return dayjs(dateISO).format(DATE_YEAR_DEFAULT_FORMAT);
};

export const FORMAT_DATE = (dateISO: string): string => {
  return dayjs(dateISO).format(DATE_MONTH_DEFAULT_FORMAT);
};

export const DEFAULT_FORMAT = (dateISO: string): string => {
  return dayjs(dateISO).format(DATE_FULL_DEFAULT_FORMAT);
};
