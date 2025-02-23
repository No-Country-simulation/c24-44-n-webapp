import { FilterFn } from "@tanstack/react-table";

const parseDate = (value: string | Date): Date => {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
};

const dateRangeFilter = <T>(): FilterFn<T> => {
  return (row, columnId, filterValue) => {
    const date = parseDate(row.getValue(columnId));
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filterValue) {
      case "day":
        return date.toDateString() === today.toDateString();
      case "week":
        return date >= weekAgo && date <= today;
      case "month":
        return date >= monthAgo && date <= today;
      default:
        return true;
    }
  };
};

const createAllOrSpecificFilter = <T>(): FilterFn<T> => {
  return (row, columnId, value) => {
    if (value === "all") return true;
    return row.getValue(columnId) === value;
  };
};

export { dateRangeFilter, createAllOrSpecificFilter };
