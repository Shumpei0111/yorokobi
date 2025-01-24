import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** IPアドレスからユーザーの国を取得 */
export const fetchUserCountry = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  console.log("User's Country:", data.country_name);
  return data.country_name;
};
