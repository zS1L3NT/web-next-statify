import React from "react"
import Colours from "../../../styles/Colours"
import Button from "../../atoms/button"
import Text from "../../atoms/text"
import Center from "../../particles/center"

const config = require("../../../config.json")

const HomeFocus = (): JSX.Element => {
	const spotify_authenticate = () => {
		const query = new URLSearchParams({
			response_type: "code",
			client_id: config.spotify.clientId,
			redirect_uri: config.spotify.redirectUri,
			scope: "user-read-private"
		}).toString()

		window.location.href = "https://accounts.spotify.com/authorize?" + query
	}

	return (
		<Center max>
			<Text color={Colours.PRIMARY} size="jumbo" className="m-auto mb-1">
				Statify
			</Text>
			<Text color={Colours.PRIMARY} size="medium" center className="m-auto mb-4">
				View your playback statistics
				<br />
				for Spotify
			</Text>
			<Button
				className="d-block m-auto"
				onClick={spotify_authenticate}
				size="medium"
				style={{ color: Colours.WHITE }}
				variant="secondary">
				Connect Spotify Account
			</Button>
		</Center>
	)
}

export default HomeFocus
