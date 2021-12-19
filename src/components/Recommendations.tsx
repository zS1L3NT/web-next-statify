import React, { useState } from "react"
import Track from "./Track"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { List, Typography } from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

interface Props {
	artist?: SpotifyApi.ArtistObjectSimplified
	track?: SpotifyApi.TrackObjectSimplified
}

const Recommendations: React.FC<Props> = (props: Props) => {
	const { track, artist } = props

	//#region Hooks
	const dispatch = useDispatch()
	const api = useSpotifyApi()
	const [tracks, setTracks] = useState<(SpotifyApi.TrackObjectSimplified | undefined)[]>(
		Array(10).fill(undefined)
	)
	//#endregion

	//#region Effects
	useEffect(() => {
		if (!api) return
		if (!track && !artist) return

		const options: SpotifyApi.RecommendationsOptionsObject = {
			limit: 10
		}

		if (track) {
			options.seed_tracks = track.id
		}

		if (artist) {
			options.seed_artists = artist.id
		}

		api.getRecommendations(options)
			.then(res => api.getTracks(res.tracks.map(t => t.id)))
			.then(res => setTracks(res.tracks))
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, track, artist])
	//#endregion

	return (
		<>
			<Typography sx={{ mt: 2 }} variant="h5">
				Recommended
			</Typography>
			<Typography sx={{ opacity: 0.75 }} variant="subtitle1">
				Tracks like this
			</Typography>
			<List>
				{tracks.map((track, i) => (
					<Track key={i} track={track} i={i} />
				))}
			</List>
		</>
	)
}

export default Recommendations
