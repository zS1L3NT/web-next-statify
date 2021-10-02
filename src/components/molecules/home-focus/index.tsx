import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Colours from "../../../styles/Colours"
import Button from "../../atoms/button"
import Text from "../../atoms/text"
import Center from "../../particles/center"

const config = require("../../../config.json")

const HomeFocus = (): JSX.Element => {
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	const spotify_authenticate = () => {
		if (access_token) {
			history.push("/top-tracks")
		} else {
			const query = new URLSearchParams({
				response_type: "code",
				client_id: config.spotify.clientId,
				redirect_uri: config.spotify.redirectUri,
				scope: "user-read-private"
			}).toString()

			window.location.href = "https://accounts.spotify.com/authorize?" + query
		}
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
				{access_token ? "See my statistics" : "Connect Spotify Account"}
			</Button>
		</Center>
	)
}

export default HomeFocus
