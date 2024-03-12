import { cache } from "react"
import SpotifyWebApi from "spotify-web-api-node"

import { TERMS } from "./constants"

export const getTopTracks = cache((token: string, term: keyof typeof TERMS) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return Promise.all([
		spotify.getMyTopTracks({
			time_range: TERMS[term as keyof typeof TERMS].term,
			offset: 0,
			limit: 49,
		}),
		spotify.getMyTopTracks({
			time_range: TERMS[term as keyof typeof TERMS].term,
			offset: 49,
			limit: 50,
		}),
	]).then(ress => ress.flatMap(res => res.body.items))
})

export const getTopArtists = cache((token: string, term: keyof typeof TERMS) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return Promise.all([
		spotify.getMyTopArtists({
			time_range: TERMS[term as keyof typeof TERMS].term,
			offset: 0,
			limit: 49,
		}),
		spotify.getMyTopArtists({
			time_range: TERMS[term as keyof typeof TERMS].term,
			offset: 49,
			limit: 50,
		}),
	]).then(ress => ress.flatMap(res => res.body.items))
})

export const getRecents = cache((token: string) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return spotify.getMyRecentlyPlayedTracks({ limit: 50 }).then(res => res.body.items)
})

export const getRecommendations = cache(
	(token: string, seed: { track?: string; artist?: string }) => {
		const spotify = new SpotifyWebApi()
		spotify.setAccessToken(token)

		return spotify
			.getRecommendations({
				seed_tracks: seed.track ? [seed.track] : undefined,
				seed_artists: seed.artist ? [seed.artist] : undefined,
				limit: 10,
			})
			.then(res => res.body.tracks)
			.then(ts => Promise.all(ts.map(t => getTrack(token, t.id))))
	},
)

export const getArtistTopTracks = cache((token: string, id: string) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return spotify.getArtistTopTracks(id, "SG").then(res => res.body.tracks)
})

export const getTrack = cache((token: string, id: string) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return spotify.getTrack(id).then(res => res.body)
})

export const getArtist = cache((token: string, id: string) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return spotify.getArtist(id).then(res => res.body)
})

export const getAlbum = cache((token: string, id: string) => {
	const spotify = new SpotifyWebApi()
	spotify.setAccessToken(token)

	return spotify.getAlbum(id).then(res => res.body)
})
