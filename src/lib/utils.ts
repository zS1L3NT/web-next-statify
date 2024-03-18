import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const TERMS = {
	month: {
		term: "short_term",
		description: "4 Weeks",
	},
	halfyear: {
		term: "medium_term",
		description: "6 Months",
	},
	lifetime: {
		term: "long_term",
		description: "Lifetime",
	},
} as const

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
