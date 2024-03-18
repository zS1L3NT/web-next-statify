import Image from "next/image"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import Icons from "@/components/icons"
import Playlist from "@/components/playlist"
import { options } from "@/next-auth"
import { getRecents, getTopArtists, getTopTracks } from "@/queries"

export default async function Page() {
	const session = await getServerSession(options)
	if (!session) return redirect("/")

	const [
		tracksMonth,
		tracksHalfyear,
		tracksLifetime,
		artistsMonth,
		artistsHalfyear,
		artistsLifetime,
		recents,
	] = await Promise.all([
		getTopTracks(session.token!, "month"),
		getTopTracks(session.token!, "halfyear"),
		getTopTracks(session.token!, "lifetime"),
		getTopArtists(session.token!, "month"),
		getTopArtists(session.token!, "halfyear"),
		getTopArtists(session.token!, "lifetime"),
		getRecents(session.token!),
	])

	return (
		<main className="relative flex md:size-full">
			<section className="fixed top-0 flex items-center w-full gap-2 p-4 pt-12 shadow-xl bg-background shadow-black md:hidden">
				<Image
					className="rounded-full"
					src={session.user!.image!}
					alt="Profile picture"
					width={32}
					height={32}
					priority
				/>
				<h3 className="text-xl font-bold">Your Statistics</h3>
			</section>

			<section className="p-2 bg-background overscroll-x-none mt-24 md:m-2 md:h-[calc(100%-16px)] md:w-[30%] md:max-w-[360px] md:rounded-lg">
				<div className="hidden gap-3 pt-2 pb-4 ml-[20px] md:flex">
					<Icons.libraryOpen className="fill-muted-foreground size-6" />
					<h3 className="text-lg text-muted-foreground">Your Statistics</h3>
				</div>

				<Playlist
					images={tracksMonth
						.map(t => t.album.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Tracks"
					description="Last month"
				/>

				<Playlist
					images={tracksHalfyear
						.map(t => t.album.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Tracks"
					description="Past half year"
				/>

				<Playlist
					images={tracksLifetime
						.map(t => t.album.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Tracks"
					description="Lifetime"
				/>

				<Playlist
					images={artistsMonth
						.map(t => t.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Artists"
					description="Last month"
				/>

				<Playlist
					images={artistsHalfyear
						.map(t => t.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Artists"
					description="Past half year"
				/>

				<Playlist
					images={artistsLifetime
						.map(t => t.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Top Artists"
					description="Lifetime"
				/>

				<Playlist
					images={recents
						.map(t => t.track.album.images[0]?.url)
						.filter((i): i is string => !!i)
						.slice(0, 4)}
					name="Recents"
					description="Last 50 tracks"
				/>
			</section>
		</main>
	)
}
