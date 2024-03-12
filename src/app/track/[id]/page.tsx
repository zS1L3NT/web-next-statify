import { getServerSession } from "next-auth"

import { Container, Grid, Typography } from "@mui/material"

import AlbumCard from "@/components/Cards/AlbumCard"
import AppearanceCard from "@/components/Cards/AppearanceCard"
import ArtistCard from "@/components/Cards/ArtistCard"
import Recommendations from "@/components/Recommendations"
import { options } from "@/next-auth"
import { getRecents, getTopTracks, getTrack } from "@/queries"

import Details from "./Details"

export default async function Page({ params: { id } }: { params: { id: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		return <></>
	}

	const [track, tracksMonth, tracksHalfyear, tracksLifetime, recents] = await Promise.all([
		getTrack(session.token, id),
		getTopTracks(session.token, "month"),
		getTopTracks(session.token, "halfyear"),
		getTopTracks(session.token, "lifetime"),
		getRecents(session.token),
	])

	const appearances: iAppearanceCard[] = [
		{
			hash: true,
			link: "/top-tracks/short-term",
			text: "streamed track of the last month",
			condition: () => (tracksMonth?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: true,
			link: "/top-tracks/medium-term",
			text: "streamed track of the last 6 months",
			condition: () => (tracksHalfyear?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: true,
			link: "/top-tracks/long-term",
			text: "streamed track of your lifetime",
			condition: () => (tracksLifetime?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: false,
			link: "/recents",
			text: `appearances of ${track?.name} in your last 50 streams`,
			condition: () => recents?.filter(t => t.track.id === id).length,
		},
	]

	return (
		<Container>
			<Details
				session={session}
				track={track}
			/>

			<Grid
				direction={{ xs: "column", sm: "row" }}
				container>
				<Grid
					sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
					item>
					<Typography
						sx={{ mt: { sm: 1 }, mb: 2 }}
						variant="h5">
						Artists
					</Typography>
					{track.artists.map(artist => (
						<ArtistCard
							key={artist.id}
							id={artist.id}
							session={session}
						/>
					))}
				</Grid>
				<Grid
					sx={{ width: { xs: "100%", sm: "50%" }, p: 1 }}
					item>
					<Typography
						sx={{ mt: 1, mb: 2 }}
						variant="h5">
						Album
					</Typography>
					<AlbumCard
						id={track.album.id}
						position={track.track_number}
						session={session}
					/>
				</Grid>
			</Grid>

			<Grid
				sx={{ m: "auto", mt: 3 }}
				spacing={1}
				justifyContent="space-evenly"
				container>
				{appearances.map((appearance, i) => (
					<AppearanceCard
						key={i}
						appearance={appearance}
					/>
				))}
			</Grid>

			<Recommendations
				track={track}
				session={session}
			/>
		</Container>
	)
}
