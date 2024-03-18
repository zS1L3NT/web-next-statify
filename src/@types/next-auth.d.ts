import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"]
		token: string
	}
}

declare module "next-auth/jwt" {
	interface Credentials {
		access_token?: string
		refresh_token?: string
		expires_at?: number
	}

	interface JWT extends Credentials {}
}
