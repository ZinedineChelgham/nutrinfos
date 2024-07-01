import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function createResponseObject(data: any, status: number = 200) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json"
    },
    status
  });
}