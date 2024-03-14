import { getServerSession } from "next-auth"

import AppearanceCard, { iAppearanceCard } from "@/components/Cards/AppearanceCard"
import Recommendations from "@/components/Recommendations"
import Track from "@/components/Track"
import { options } from "@/next-auth"
import { getArtist, getArtistTopTracks, getRecents, getTopArtists, getTopTracks } from "@/queries"

import Details from "./Details"

export default async function Page({ params: { id } }: { params: { id: string } }) {
	const session = await getServerSession(options)
	if (!session?.token) {
		return <></>
	}

	const [
		artist,
		artistTracks,
		artistsMonth,
		artistsHalfyear,
		artistsLifetime,
		tracksMonth,
		tracksHalfyear,
		tracksLifetime,
		recents,
	] = await Promise.all([
		getArtist(session.token, id),
		getArtistTopTracks(session.token, id),
		getTopArtists(session.token, "month"),
		getTopArtists(session.token, "halfyear"),
		getTopArtists(session.token, "lifetime"),
		getTopTracks(session.token, "month"),
		getTopTracks(session.token, "halfyear"),
		getTopTracks(session.token, "lifetime"),
		getRecents(session.token),
	])

	const appearances: iAppearanceCard[] = [
		{
			hash: true,
			text: "streamed artist of the last month",
			link: "/top-artists/short-term",
			condition: () => (artistsMonth?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: true,
			text: "streamed artist of the last 6 months",
			link: "/top-artists/medium-term",
			condition: () => (artistsHalfyear?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: true,
			text: "streamed artist of your lifetime",
			link: "/top-artists/long-term",
			condition: () => (artistsLifetime?.findIndex(t => t.id === id) || 0) + 1,
		},
		{
			hash: false,
			link: "/top-tracks/short-term",
			text: `appearances from ${artist?.name} in your top tracks of the last month`,
			condition: () => tracksMonth?.filter(t => t.artists.find(a => a.id === id)).length,
		},
		{
			hash: false,
			link: "/top-tracks/medium-term",
			text: `appearances from ${artist?.name} in your top tracks of the last 6 months`,
			condition: () => tracksHalfyear?.filter(t => t.artists.find(a => a.id === id)).length,
		},
		{
			hash: false,
			link: "/top-tracks/long-term",
			text: `appearances from ${artist?.name} in your top tracks of your lifetime`,
			condition: () => tracksLifetime?.filter(t => t.artists.find(a => a.id === id)).length,
		},
		{
			hash: false,
			link: "/recents",
			text: `appearances from ${artist?.name} in your last 50 streams`,
			condition: () => recents?.filter(t => t.track.artists.find(a => a.id === id)).length,
		},
	]

	return (
		<Container>
			<Details
				session={session}
				artist={artist}
			/>

			<Stack
				sx={{ mt: 2 }}
				spacing={1}
				direction="row">
				{!artist ? (
					<Skeleton
						variant="text"
						width={100}
						height={40}
					/>
				) : null}
				<Typography
					sx={{ height: "fit-content", my: "auto !important" }}
					variant="h5">
					{artist ? artist.name + "'s" : ""} Top Tracks
				</Typography>
			</Stack>
			<List>
				{(artistTracks ?? Array(5).fill(undefined)).map((t, i) => (
					<Track
						key={i}
						track={t}
						i={i}
					/>
				))}
			</List>

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
				session={session}
				artist={artist}
			/>
		</Container>
	)
}
