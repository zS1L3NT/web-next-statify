import { List, Typography } from "@mui/material"

import { useGetRecommendationsQuery } from "../api/api"
import { useGetTracksQuery } from "../api/track"
import useAuthenticated from "../hooks/useAuthenticated"
import Track from "./Track"

const Recommendations = ({
	track,
	artist,
}: {
	artist?: SpotifyApi.ArtistObjectSimplified
	track?: SpotifyApi.TrackObjectSimplified
}) => {
	const token = useAuthenticated()

	const { data: recommendations } = useGetRecommendationsQuery(
		{
			seed_tracks: track ? [track.id] : undefined,
			seed_artists: artist ? [artist.id] : undefined,
			limit: 10,
			token,
		},
		{ skip: !track && !artist },
	)
	const { data: tracks } = useGetTracksQuery(
		{ ids: recommendations?.tracks.map(t => t.id) ?? [], token },
		{ skip: !recommendations },
	)

	return (
		<>
			<Typography
				sx={{ mt: 2 }}
				variant="h5">
				Recommended
			</Typography>
			<Typography
				sx={{ opacity: 0.75 }}
				variant="subtitle1">
				Tracks like this
			</Typography>
			<List>
				{(tracks ?? Array(10).fill(undefined)).map((track, i) => (
					<Track
						key={i}
						track={track}
						i={i}
					/>
				))}
			</List>
		</>
	)
}

export default Recommendations
