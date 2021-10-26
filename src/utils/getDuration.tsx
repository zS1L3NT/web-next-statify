import { Duration } from "luxon"

const getDuration = (track: SpotifyApi.TrackObjectFull): string => {
	const duration = Duration.fromMillis(track.duration_ms)

	const [years, months, days, hours, minutes, seconds] = duration
		.toFormat("y M d h m s")
		.split(" ")
		.map(v => +v)

	let format = `${seconds}s`

	if (minutes > 0) {
		format = `${minutes}m ${format}`
	}

	if (hours > 0) {
		format = `${hours}h ${format}`
	}

	if (days > 0) {
		format = `${days}d ${format}`
	}

	if (months > 0) {
		format = `${months}M ${format}`
	}

	if (years > 0) {
		format = `${years}Y ${format}`
	}

	return format
}

export default getDuration
