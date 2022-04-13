import React, { useEffect, useState } from "react"

import { List, Typography } from "@mui/material"

import useAppDispatch from "../hooks/useAppDispatch"
import useSpotifyApi from "../hooks/useSpotifyApi"
import { set_error } from "../slices/ErrorSlice"
import Track from "./Track"

interface Props {
	artist?: SpotifyApi.ArtistObjectSimplified
	track?: SpotifyApi.TrackObjectSimplified
}

const Recommendations: React.FC<Props> = (props: Props) => {
	const { track, artist } = props

	const dispatch = useAppDispatch()
	const api = useSpotifyApi()
	const [tracks, setTracks] = useState<(SpotifyApi.TrackObjectSimplified | undefined)[]>(
		Array(10).fill(undefined)
	)

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
			.then(res => {
				if (!res.tracks.length) {
					return setTracks([])
				}

				api.getTracks(res.tracks.map(t => t.id))
					.then(res => setTracks(res.tracks))
					.catch(err => dispatch(set_error(err)))
			})
			.catch(err => dispatch(set_error(err)))
	}, [dispatch, api, track, artist])

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
