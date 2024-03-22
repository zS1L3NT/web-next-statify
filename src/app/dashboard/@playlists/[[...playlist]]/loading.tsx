import Playlist from "@/components/playlist"

export default function Loading() {
	return (
		<>
			<Playlist
				name="Top Tracks"
				description="Last month"
				href="/dashboard/top-tracks/month"
			/>

			<Playlist
				name="Top Tracks"
				description="Past half year"
				href="/dashboard/top-tracks/halfyear"
			/>

			<Playlist
				name="Top Tracks"
				description="Lifetime"
				href="/dashboard/top-tracks/lifetime"
			/>

			<Playlist
				name="Top Artists"
				description="Last month"
				href="/dashboard/top-artists/month"
			/>

			<Playlist
				name="Top Artists"
				description="Past half year"
				href="/dashboard/top-artists/halfyear"
			/>

			<Playlist
				name="Top Artists"
				description="Lifetime"
				href="/dashboard/top-artists/lifetime"
			/>

			<Playlist
				name="Recents"
				description="Last 50 tracks"
				href="/dashboard/recents"
			/>
		</>
	)
}
