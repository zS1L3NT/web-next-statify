import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const isTerm = (term: string): term is keyof typeof TERMS => term in TERMS

export const TERMS = {
	month: {
		range: "short_term",
		description: "4 Weeks",
	},
	halfyear: {
		range: "medium_term",
		description: "6 Months",
	},
	lifetime: {
		range: "long_term",
		description: "Lifetime",
	},
} as const
