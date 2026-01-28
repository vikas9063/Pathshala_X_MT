import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MAX_FILE_SIZE_BYTES_LOGO = 300 * 1024 // 300 KB

export const getBase64Size = (base64: string) =>
  Math.ceil((base64.length * 3) / 4)