import { cookies } from "next/headers"

import { verify } from "@/lib/jwt"

export type Session = {
	user: {
		id: string
		name: string
		picture: string
	}
	token: {
		access_token: string
		refresh_token: string
		expires_at: number
	}
}

const loginUrl = new URL("https://accounts.spotify.com/authorize")
loginUrl.searchParams.append("client_id", process.env.SPOTIFY_CLIENT_ID)
loginUrl.searchParams.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI)
loginUrl.searchParams.append("response_type", "code")
loginUrl.searchParams.append(
	"scope",
	"user-top-read user-read-recently-played user-follow-read user-follow-modify user-library-read user-library-modify",
)
export const loginHref = loginUrl.href

export const refreshSession = async (input: { code: string } | { refresh_token: string }) => {
	const token = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET,
				).toString("base64"),
		},
		body: new URLSearchParams(
			"refresh_token" in input
				? { grant_type: "refresh_token", refresh_token: input.refresh_token }
				: {
						grant_type: "authorization_code",
						code: input.code,
						redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
					},
		),
	}).then(res => res.json())
	if ("error" in token) {
		throw new Error(`Failed to get new access token: ${token.error_description}`)
	}

	const user = await fetch("https://api.spotify.com/v1/me", {
		headers: {
			Authorization: "Bearer " + token.access_token,
		},
	}).then(res => res.json())
	if ("error" in user) {
		throw new Error(`Failed to fetch user profile: ${token.error_description}`)
	}

	return {
		user: {
			id: user.id,
			name: user.display_name,
			picture: user.images[0]?.url,
		},
		token: {
			access_token: token.access_token,
			refresh_token:
				token.refresh_token ?? ("refresh_token" in input ? input.refresh_token : ""),
			expires_at: Date.now() + token.expires_in * 1000,
		},
	}
}

export const getSession = async (): Promise<Session | null> => {
	const cookie = cookies().get(process.env.COOKIE_NAME)?.value
	if (!cookie) return null
	return await verify(cookie)
}
