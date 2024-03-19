import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { refreshSession } from "@/lib/auth"
import { sign } from "@/lib/jwt"

export async function GET(req: Request) {
	const code = new URL(req.url).searchParams.get("code")
	if (!code) {
		return new Response("Missing code", { status: 400 })
	}

	try {
		cookies().set({
			name: process.env.COOKIE_NAME,
			value: await sign(await refreshSession({ code })),
			sameSite: "lax",
			secure: process.env.SPOTIFY_REDIRECT_URI.startsWith("https://"),
		})
	} catch (error) {
		console.error("Failed to create session", error)
		cookies().delete(process.env.COOKIE_NAME)
		return new Response((error as Error).message, { status: 400 })
	}

	redirect("/dashboard")
}
