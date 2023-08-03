import { useLocation } from "react-router-dom"

import { Container, Grid, List, Typography } from "@mui/material"

import { useGetAlbumQuery, useGetAlbumTracksQuery } from "../api/album"
import ArtistCard from "../components/Cards/ArtistCard"
import AlbumDetails from "../components/Details/AlbumDetails"
import Track from "../components/Track"
import useAuthenticated from "../hooks/useAuthenticated"

/**
 * * Name
 * ! Release Date
 * * Length
 * * Artists
 * * - Name
 * * - Link
 * * - Picture
 * * Tracks
 * * - Name
 * * - Artists
 * * - Picture
 */

const Album = () => {
	const token = useAuthenticated()

	const location = useLocation()

	const { data: album } = useGetAlbumQuery({ id: location.pathname.split("/")[2]!, token })
	const { data: tracks } = useGetAlbumTracksQuery({ id: location.pathname.split("/")[2]!, token })

	return (
		<Container>
			<AlbumDetails
				album={album}
				tracks={tracks ?? Array(10).fill(undefined)}
			/>

			<Typography
				sx={{ mt: { sm: 1 }, mb: 2 }}
				variant="h5">
				Artists
			</Typography>
			<Grid
				direction={{ xs: "column", sm: "row" }}
				container>
				{album ? (
					album.artists.map(artist => (
						<Grid
							sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
							key={artist.id}
							item>
							<ArtistCard artistId={artist.id} />
						</Grid>
					))
				) : (
					<Grid
						sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
						item>
						<ArtistCard />
					</Grid>
				)}
			</Grid>

			<Typography
				sx={{ mt: { sm: 1 }, mb: 2 }}
				variant="h5">
				Tracks
			</Typography>
			<List>
				{(tracks ?? Array(10).fill(undefined)).map((track, i) => (
					<Track
						key={i}
						track={track}
						album={album}
						i={i}
					/>
				))}
			</List>
		</Container>
	)
}

export default Album
