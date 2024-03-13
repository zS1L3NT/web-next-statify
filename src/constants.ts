import { AccessTime, AccessTimeFilled, Timeline } from "@mui/icons-material"

export const TERMS = {
	month: {
		term: "short_term",
		description: "4 Weeks",
		icon: AccessTime,
	},
	halfyear: {
		term: "medium_term",
		description: "6 Months",
		icon: AccessTimeFilled,
	},
	lifetime: {
		term: "long_term",
		description: "Lifetime",
		icon: Timeline,
	},
} as const
