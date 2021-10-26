function round(num: number, decimalPlaces = 0) {
	num = Math.round(num + "e" + decimalPlaces as unknown as number)
	return Number(num + "e" + -decimalPlaces)
}

const getFollowers = (artist: SpotifyApi.ArtistObjectFull): string => {
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

export default getFollowers
