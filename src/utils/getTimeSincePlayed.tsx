import { DateTime } from "luxon"

const getTimeSincePlayed = (recent: SpotifyApi.PlayHistoryObject): string => {
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

export default getTimeSincePlayed
