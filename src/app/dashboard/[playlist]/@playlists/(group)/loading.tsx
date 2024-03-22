import Playlist from "@/app/dashboard/[playlist]/components/playlist"

export default function Loading() {
	return (
		<>
			<Playlist
				name="Top Tracks"
				description="Last month"
			/>

			<Playlist
				name="Top Tracks"
				description="Past half year"
			/>

			<Playlist
				name="Top Tracks"
				description="Lifetime"
			/>

			<Playlist
				name="Top Artists"
				description="Last month"
			/>

			<Playlist
				name="Top Artists"
				description="Past half year"
			/>

			<Playlist
				name="Top Artists"
				description="Lifetime"
			/>

			<Playlist
				name="Recents"
				description="Last 50 tracks"
			/>
		</>
	)
}
