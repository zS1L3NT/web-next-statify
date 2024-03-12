import { getServerSession } from "next-auth"

import { Container, Grid, List, Typography } from "@mui/material"

import ArtistCard from "@/components/Cards/ArtistCard"
import Track from "@/components/Track"
import { options } from "@/next-auth"
import { getAlbum, getAlbumTracks } from "@/queries"

import Details from "./Details"

export default async function Page({ params: { id } }: { params: { id: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		return <></>
	}

	const [album, tracks] = await Promise.all([
		getAlbum(session.token, id),
		getAlbumTracks(session.token, id),
	])

	return (
		<Container>
			<Details
				session={session}
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
				{album.artists.map(artist => (
					<Grid
						sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
						key={artist.id}
						item>
						<ArtistCard
							session={session}
							id={artist.id}
						/>
					</Grid>
				))}
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
