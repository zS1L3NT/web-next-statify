"use client"

import { signIn } from "next-auth/react"

import Icons from "./icons"
import { Button } from "./ui/button"

export default function LoginButton() {
	return (
		<Button
			className="mt-2 md:mt-4 lg:mt-6"
			variant="outline"
			onClick={() => signIn("spotify")}>
			<Icons.spotify className="size-4" />
			<p className="ml-2">Login with Spotify</p>
		</Button>
	)
}
