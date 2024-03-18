"use client"

import { signIn } from "next-auth/react"

import Spotify from "./spotify"
import { Button } from "./ui/button"

export default function LoginButton() {
	return (
		<Button
			className="mt-2 md:mt-4 lg:mt-6"
			variant="outline"
			onClick={() => signIn("spotify")}>
			<Spotify style={{ width: 16, height: 16, color: "black" }} />
			<p className="ml-2">Login with Spotify</p>
		</Button>
	)
}
