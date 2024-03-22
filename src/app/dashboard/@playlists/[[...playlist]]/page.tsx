import Playlist from "@/components/playlist"
import { getSession } from "@/lib/auth"
import { getRecents, getTopArtists, getTopTracks } from "@/queries"

export default async function Page() {
	const session = await getSession()
	if (!session) return <></>

	const [
		tracksMonth,
		tracksHalfyear,
		tracksLifetime,
		artistsMonth,
		artistsHalfyear,
		artistsLifetime,
		recents,
	] = await Promise.all([
		getTopTracks(session, "month"),
		getTopTracks(session, "halfyear"),
		getTopTracks(session, "lifetime"),
		getTopArtists(session, "month"),
		getTopArtists(session, "halfyear"),
		getTopArtists(session, "lifetime"),
		getRecents(session),
	])

	return (
		<>
			<Playlist
				images={tracksMonth
					.map(t => t.album.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Tracks"
				description="Last month"
				href="/dashboard/top-tracks/month"
			/>

			<Playlist
				images={tracksHalfyear
					.map(t => t.album.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Tracks"
				description="Past half year"
				href="/dashboard/top-tracks/halfyear"
			/>

			<Playlist
				images={tracksLifetime
					.map(t => t.album.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Tracks"
				description="Lifetime"
				href="/dashboard/top-tracks/lifetime"
			/>

			<Playlist
				images={artistsMonth
					.map(t => t.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Artists"
				description="Last month"
				href="/dashboard/top-artists/month"
			/>

			<Playlist
				images={artistsHalfyear
					.map(t => t.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Artists"
				description="Past half year"
				href="/dashboard/top-artists/halfyear"
			/>

			<Playlist
				images={artistsLifetime
					.map(t => t.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Top Artists"
				description="Lifetime"
				href="/dashboard/top-artists/lifetime"
			/>

			<Playlist
				images={recents
					.map(t => t.track.album.images[0]?.url)
					.filter((i): i is string => !!i)
					.slice(0, 4)}
				name="Recents"
				description="Last 50 tracks"
				href="/dashboard/recents"
			/>
		</>
	)
}
