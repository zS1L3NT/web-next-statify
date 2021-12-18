import React, { useState } from "react"
import useSpotifyApi from "../hooks/useSpotifyApi"
import {
	Avatar,
	Card,
	CardActionArea,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Stack,
	Typography
} from "@mui/material"
import { set_error } from "../actions/ErrorActions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

interface Props {
	artist?: SpotifyApi.ArtistObjectFull
	track?: SpotifyApi.TrackObjectFull
}

const Recommendations: React.FC<Props> = (props: Props) => {
	const { track, artist } = props

	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const api = useSpotifyApi()
	const [tracks, setTracks] = useState<(SpotifyApi.TrackObjectFull | undefined)[]>(
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

	//#region Functions
	const handleTrackClick = (track?: SpotifyApi.TrackObjectFull) => {
		if (track) {
			history.push("/track/" + track.id)
		}
	}
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
					<Card sx={{ my: 1 }} key={i} onClick={() => handleTrackClick(track)}>
						<CardActionArea>
							<ListItem>
								<ListItemAvatar>
									{track ? (
										<Avatar
											sx={{ width: 45, height: 45 }}
											src={track.album.images.at(0)?.url || ""}
										/>
									) : (
										<Skeleton variant="circular" width={45} height={45} />
									)}
								</ListItemAvatar>
								{track ? (
									<ListItemText
										primary={track.name}
										secondary={track.artists.map(a => a.name).join(", ")}
									/>
								) : (
									<Stack my="6px">
										<Skeleton variant="text" width={200} height={24} />
										<Skeleton variant="text" width={160} height={20} />
									</Stack>
								)}
							</ListItem>
						</CardActionArea>
					</Card>
				))}
			</List>
		</>
	)
}

export default Recommendations
