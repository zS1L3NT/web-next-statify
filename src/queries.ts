import { Session } from "@/lib/auth"

const TERMS = {
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

const revalidate = 15 * 60

export const getTopTracks = (session: Session, term: keyof typeof TERMS) => {
	const { range } = TERMS[term as keyof typeof TERMS]
	return Promise.all([
		fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=49`, {
			headers: { Authorization: `Bearer ${session.token.access_token}` },
			next: { revalidate },
		}).then(res => res.json()),
		fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&offset=49&limit=50`, {
			headers: { Authorization: `Bearer ${session.token.access_token}` },
			next: { revalidate },
		}).then(res => res.json()),
	]).then(ress => ress.flatMap(res => res.items))
}

export const getTopArtists = (session: Session, term: keyof typeof TERMS) => {
	const { range } = TERMS[term as keyof typeof TERMS]
	return Promise.all([
		fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=49`, {
			headers: { Authorization: `Bearer ${session.token.access_token}` },
			next: { revalidate },
		}).then(res => res.json()),
		fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${range}&offset=49&limit=50`, {
			headers: { Authorization: `Bearer ${session.token.access_token}` },
			next: { revalidate },
		}).then(res => res.json()),
	]).then(ress => ress.flatMap(res => res.items))
}

export const getRecents = (session: Session): Promise<SpotifyApi.PlayHistoryObject[]> => {
	return fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
		headers: { Authorization: `Bearer ${session.token.access_token}` },
		next: { revalidate },
	})
		.then(res => res.json())
		.then(res => res.items)
}

// export const getRecommendations = cache(
// 	(token: string, seed: { track?: string; artist?: string }) => {
// 		const spotify = new SpotifyWebApi()
// 		spotify.setAccessToken(token)

// 		return spotify
// 			.getRecommendations({
// 				seed_tracks: seed.track ? [seed.track] : undefined,
// 				seed_artists: seed.artist ? [seed.artist] : undefined,
// 				limit: 10,
// 			})
// 			.then(res => res.body.tracks)
// 			.then(ts => Promise.all(ts.map(t => getTrack(token, t.id))))
// 	},
// )

// export const getTrack = cache((token: string, id: string) => {
// 	const spotify = new SpotifyWebApi()
// 	spotify.setAccessToken(token)

// 	return spotify.getTrack(id).then(res => res.body)
// })

// export const getArtist = cache((token: string, id: string) => {
// 	const spotify = new SpotifyWebApi()
// 	spotify.setAccessToken(token)

// 	return spotify.getArtist(id).then(res => res.body)
// })

// export const getArtistTopTracks = cache((token: string, id: string) => {
// 	const spotify = new SpotifyWebApi()
// 	spotify.setAccessToken(token)

// 	return spotify.getArtistTopTracks(id, "SG").then(res => res.body.tracks)
// })

// export const getAlbum = cache((token: string, id: string) => {
// 	const spotify = new SpotifyWebApi()
// 	spotify.setAccessToken(token)

// 	return spotify.getAlbum(id).then(res => res.body)
// })

// export const getAlbumTracks = cache((token: string, id: string) => {
// 	const spotify = new SpotifyWebApi()
// 	spotify.setAccessToken(token)

// 	return spotify.getAlbumTracks(id).then(res => res.body.items)
// })
