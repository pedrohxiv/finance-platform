import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertAmountFromMiliunits = (amount: number) => {
  return amount / 1000;
};

export const convertAmountToMiliunits = (amount: number) => {
  return Math.round(amount * 1000);
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const calculatePercentageChange = (
  current: number,
  previous: number
) => {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
};

export const fillMissingDays = (
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date
) => {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((activeDay) =>
      isSameDay(activeDay.date, day)
    );

    if (found) {
      return found;
    } else {
      return { date: day, income: 0, expenses: 0 };
    }
  });

  return transactionsByDay;
};

export const formatDateRange = (period?: {
  from: string | Date | undefined;
  to: string | Date | undefined;
}) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y"
    )}`;
  }

  return `${format(period.from, "LLL dd, y")}`;
};

export const formatPercentage = (
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false }
) => {
  const result = new Intl.NumberFormat("en-US", { style: "percent" }).format(
    value / 100
  );

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
};
