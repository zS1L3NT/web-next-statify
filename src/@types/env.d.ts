declare module NodeJS {
	interface ProcessEnv {
		readonly NEXTAUTH_SECRET: string
		readonly SPOTIFY_CLIENT_ID: string
		readonly SPOTIFY_CLIENT_SECRET: string
	}
}
