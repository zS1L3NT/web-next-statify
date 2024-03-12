import { Session } from "next-auth"

import { List, Typography } from "@mui/material"

import { getRecommendations } from "@/queries"

import Track from "./Track"

export default async function Recommendations({
	session,
	track,
	artist,
}: {
	session: Session
	artist?: SpotifyApi.ArtistObjectSimplified
	track?: SpotifyApi.TrackObjectSimplified
}) {
	const recommendations = await getRecommendations(session.token, {
		track: track?.id,
		artist: artist?.id,
	})

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
				{(recommendations ?? Array(10).fill(undefined)).map((track, i) => (
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
