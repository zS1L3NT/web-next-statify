import { notFound } from "next/navigation"

import { getSession } from "@/lib/auth"
import { isTerm } from "@/lib/utils"
import { getTopArtists } from "@/queries"

export default async function Page({ params: { term } }: { params: { term: string } }) {
	const session = await getSession()
	if (!session) return <></>
	if (!isTerm(term)) return notFound()

	const artists = await getTopArtists(session, term)

	return <></>
}
