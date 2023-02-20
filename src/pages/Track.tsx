import { useLocation } from "react-router-dom"

import { Container, Grid, Typography } from "@mui/material"

import api, { useGetRecentsQuery } from "../api/api"
import { useGetTrackQuery } from "../api/track"
import AlbumCard from "../components/Cards/AlbumCard"
import AppearanceCard from "../components/Cards/AppearanceCard"
import ArtistCard from "../components/Cards/ArtistCard"
import TrackDetails from "../components/Details/TrackDetails"
import Recommendations from "../components/Recommendations"
import useAuthenticated from "../hooks/useAuthenticated"
import useGetFullTopTracksQuery from "../hooks/useGetFullTopTracksQuery"

/**
 * * Name
 * ! Popularity
 * ! Explicity
 * * Link
 * * Artists[i]
 * * - Name
 * * - Link
 * * Album
 * * - Name
 * * - Picture
 * * - Link
 *
 * * Position in Top Tracks
 * * In Favourites
 * * Recommendations
 * * Check if you liked this
 * * Appearances in Recents
 */

const Track = ({}: {}) => {
	const token = useAuthenticated()

	const location = useLocation()

	const trackId = location.pathname.split("/")[2]!
	const { data: track } = useGetTrackQuery({ id: trackId, token })
	const { data: userTopTracksShortTerm } = useGetFullTopTracksQuery({
		time_range: "short_term",
		token
	})
	const { data: userTopTracksMediumTerm } = useGetFullTopTracksQuery({
		time_range: "medium_term",
		token
	})
	const { data: userTopTracksLongTerm } = useGetFullTopTracksQuery({
		time_range: "long_term",
		token
	})
	const { data: userRecents } = useGetRecentsQuery({ token })

	const appearances: iAppearanceCard[] = [
		{
			hash: true,
			link: "/top-tracks/short-term",
			text: "streamed track of the last month",
			condition: () => (userTopTracksShortTerm?.findIndex(t => t.id === trackId) || 0) + 1
		},
		{
			hash: true,
			link: "/top-tracks/medium-term",
			text: "streamed track of the last 6 months",
			condition: () => (userTopTracksMediumTerm?.findIndex(t => t.id === trackId) || 0) + 1
		},
		{
			hash: true,
			link: "/top-tracks/long-term",
			text: "streamed track of your lifetime",
			condition: () => (userTopTracksLongTerm?.findIndex(t => t.id === trackId) || 0) + 1
		},
		{
			hash: false,
			link: "/recents",
			text: `appearances of ${track?.name} in your last 50 streams`,
			condition: () => userRecents?.filter(t => t.track.id === trackId).length
		}
	]

	return (
		<Container>
			<TrackDetails track={track} />

			<Grid direction={{ xs: "column", sm: "row" }} container>
				<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
					<Typography sx={{ mt: { sm: 1 }, mb: 2 }} variant="h5">
						Artists
					</Typography>
					{track ? (
						track.artists.map(artist => (
							<ArtistCard key={artist.id} artistId={artist.id} />
						))
					) : (
						<ArtistCard />
					)}
				</Grid>
				<Grid sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }} item>
					<Typography sx={{ mt: 1, mb: 2 }} variant="h5">
						Album
					</Typography>
					<AlbumCard albumId={track?.album.id} position={track?.track_number} />
				</Grid>
			</Grid>

			<Grid sx={{ m: "auto", mt: 3 }} spacing={1} justifyContent="space-evenly" container>
				{appearances.map((appearance, i) => (
					<AppearanceCard key={i} appearance={appearance} />
				))}
			</Grid>

			<Recommendations track={track} />
		</Container>
	)
}

export default Track
