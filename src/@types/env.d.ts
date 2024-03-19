declare module NodeJS {
	interface ProcessEnv {
		readonly COOKIE_NAME: string
		readonly JWT_SECRET: string
		readonly SPOTIFY_CLIENT_ID: string
		readonly SPOTIFY_CLIENT_SECRET: string
		readonly SPOTIFY_REDIRECT_URI: string
	}
}
