import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import LoginButton from "@/components/login-button"
import { options } from "@/next-auth"

export default async function Page() {
	const session = await getServerSession(options)
	if (session) return redirect("/dashboard")

	return (
		<main className="container my-20 md:my-26 lg:my-32">
			<section className="flex flex-col items-center gap-2">
				<span className="px-3 py-1 text-sm font-medium rounded-lg bg-muted w-fit">
					✨ <span className="inline-block w-1"></span> Redesigned for better experience!
				</span>
				<h1 className="text-3xl font-bold text-center md:text-6xl">
					Your Spotify Statistics
				</h1>
				<p className="text-lg text-center sm:text-xl text-muted-foreground">
					View your top spotify statistics
				</p>

				<LoginButton />
			</section>
		</main>
	)
}
