import { getSession } from "@/lib/auth"
import { getRecents } from "@/queries"

export default async function Page() {
	const session = await getSession()
	if (!session) return <></>

	const recents = await getRecents(session)

	return <></>
}
