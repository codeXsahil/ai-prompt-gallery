import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeImage(url: string) {
  if (!url) return "";
  if (url.includes("cloudinary.com")) {
    // Insert f_auto,q_auto before /v[version_number] or /upload/
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  }
  return url;
}
