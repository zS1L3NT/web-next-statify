declare module NodeJS {
	interface ProcessEnv {
		readonly VITE_POSTHOG_KEY: string
		readonly VITE_POSTHOG_HOST: string
	}
}
