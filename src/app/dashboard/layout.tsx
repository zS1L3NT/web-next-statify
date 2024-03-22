import { redirect } from "next/navigation"
import { PropsWithChildren, ReactNode } from "react"

import { getSession } from "@/lib/auth"

export default async function Page({
	children,
	playlists,
}: PropsWithChildren<{ playlists: ReactNode }>) {
	const session = await getSession()
	if (!session) return redirect("/")

	return (
		<main className="relative flex md:size-full">
			{playlists}
			{children}
		</main>
	)
}
