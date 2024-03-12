import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	],
})

export { handler as GET, handler as POST }
