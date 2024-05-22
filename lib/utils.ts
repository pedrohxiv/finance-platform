import { clsx, type ClassValue } from "clsx";
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
