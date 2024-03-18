import { getServerSession } from "next-auth"

import Spotify from "@/components/spotify"
import { Button } from "@/components/ui/button"
import { options } from "@/next-auth"

export default async function Page() {
	const session = await getServerSession(options)

	return (
		<main className="container my-20 md:my-26 lg:my-32">
			<section className="flex flex-col items-center gap-2">
				<span className="px-3 py-1 text-sm font-medium rounded-lg bg-muted w-fit">
					✨ <span className="inline-block w-1"></span> Redesigned for better experience!
				</span>
				<h1 className="text-3xl font-bold text-center md:text-6xl">
					Your Spotify Statistics
				</h1>
				<p className="mx-auto text-lg text-center sm:text-xl text-muted-foreground max-w-[250px] md:max-w-full">
					View your top spotify statistics like you&apos;re in spotify
				</p>

				<Button
					className="mt-2 md:mt-4 lg:mt-6"
					variant="outline">
					<Spotify style={{ width: 16, height: 16, color: "black" }} />
					<p className="ml-2">Login with Spotify</p>
				</Button>
			</section>
		</main>
	)
}
