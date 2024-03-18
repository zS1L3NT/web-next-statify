import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const scopes =
	"user-top-read user-read-recently-played user-follow-read user-follow-modify user-library-read user-library-modify"

export const options: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.access_token = account.access_token
				token.refresh_token = account.refresh_token
				token.expires_at = account.expires_at
				return token
			}

			if (Date.now() < token.expires_at! * 1000) {
				return token
			}

			return fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					Authorization:
						"Basic " +
						Buffer.from(
							process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET,
						).toString("base64"),
				},
				body: new URLSearchParams({
					grant_type: "refresh_token",
					refresh_token: token.refresh_token!,
				}),
			})
				.then(res => res.json())
				.then(data => ({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
					expires_at: Date.now() + data.expires_in * 1000,
				}))
		},
		session({ session, token }) {
			session.token = token.access_token!
			delete session.user?.email
			return session
		},
	},
}
