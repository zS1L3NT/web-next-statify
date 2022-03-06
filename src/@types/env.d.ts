/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE__SPOTIFY__CLIENT_ID: string
	readonly VITE__SPOTIFY__SCOPE: string
	readonly VITE__SPOTIFY__REDIRECT_URI: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}