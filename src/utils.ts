import { DateTime, Duration } from "luxon"

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

export const getDuration = (duration_ms: number): string => {
	const duration = Duration.fromMillis(duration_ms)

	const [years, months, days, hours, minutes, seconds] = duration
		.toFormat("y M d h m s")
		.split(" ")
		.map(v => +v)

	let format = `${seconds}s`

	if (minutes && minutes > 0) {
		format = `${minutes}m ${format}`
	}

	if (hours && hours > 0) {
		format = `${hours}h ${format}`
	}

	if (days && days > 0) {
		format = `${days}d ${format}`
	}

	if (months && months > 0) {
		format = `${months}M ${format}`
	}

	if (years && years > 0) {
		format = `${years}Y ${format}`
	}

	return format
}

export const getFollowers = (artist: SpotifyApi.ArtistObjectFull): string => {
	function round(num: number, decimalPlaces = 0) {
		num = Math.round((num + "e" + decimalPlaces) as unknown as number)
		return Number(num + "e" + -decimalPlaces)
	}

	let total = artist.followers.total

	if (total < 1000) {
		return total + " followers"
	}

	total /= 1000
	if (total < 10) {
		return round(total, 2) + "k followers"
	}

	if (total < 100) {
		return round(total, 1) + "k followers"
	}

	if (total < 1000) {
		return round(total, 0) + "k followers"
	}

	total /= 1000
	if (total < 10) {
		return round(total, 2) + "m followers"
	}

	if (total < 100) {
		return round(total, 1) + "m followers"
	}

	if (total < 1000) {
		return round(total, 0) + "m followers"
	}

	total /= 1000
	if (total < 10) {
		return round(total, 2) + "b followers"
	}

	if (total < 10) {
		return round(total, 1) + "b followers"
	}

	if (total < 10) {
		return round(total, 0) + "b followers"
	}

	return ""
}

export const getTimeSincePlayed = (recent: SpotifyApi.PlayHistoryObject): string => {
	const datetime = DateTime.fromISO(recent.played_at)
	const duration = DateTime.now().diff(datetime)

	const [years, months, days, hours, minutes, seconds] = duration
		.toFormat("y M d h m s")
		.split(" ")
		.map(v => +v)

	let format = `${seconds}s`

	if (minutes && minutes > 0) {
		format = `${minutes}m ${format}`
	}

	if (hours && hours > 0) {
		format = `${hours}h ${format}`
	}

	if (days && days > 0) {
		format = `${days}d ${format}`
	}

	if (months && months > 0) {
		format = `${months}M ${format}`
	}

	if (years && years > 0) {
		format = `${years}Y ${format}`
	}

	return format
}
