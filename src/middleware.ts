import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { refreshSession } from "@/lib/auth"
import { sign, verify } from "@/lib/jwt"

export async function middleware(req: NextRequest) {
	const cookie = cookies().get(process.env.COOKIE_NAME)?.value
	if (!cookie) return NextResponse.next()

	const session = await verify(cookie)
	if (!session) {
		const res = NextResponse.next()
		res.cookies.delete(process.env.COOKIE_NAME)
		return res
	}

	if (Date.now() < session.token.expires_at) return NextResponse.next()

	try {
		const res = NextResponse.next()
		res.cookies.set({
			name: process.env.COOKIE_NAME,
			value: await sign(
				await refreshSession({
					refresh_token: session.token.refresh_token,
				}),
			),
			sameSite: "lax",
			secure: process.env.SPOTIFY_REDIRECT_URI.startsWith("https://"),
		})
		return res
	} catch (error) {
		console.error("Failed to refresh outdated session", error)

		const url = req.nextUrl.clone()
		const res = NextResponse.redirect(url)
		url.pathname = "/"
		res.cookies.delete(process.env.COOKIE_NAME)

		return res
	}
}

export const config = {
	matcher: ["/", "/dashboard/:path"],
}
