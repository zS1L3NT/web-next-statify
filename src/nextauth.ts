import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export const options: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	],
}
