import React from "react"
import Colours from "../../../styles/Colours"
import Button from "../../atoms/button"
import Text from "../../atoms/text"
import Center from "../../particles/center"

const HomeFocus = (): JSX.Element => {
	return (
		<Center className="w-100 h-100">
			<Text color={Colours.PRIMARY} size="jumbo" className="m-auto mb-1">
				Statify
			</Text>
			<Text color={Colours.PRIMARY} size="medium" center className="m-auto mb-4">
				View your playback statistics<br />
				for Spotify
			</Text>
			<Button variant="secondary" size="medium" className="d-block m-auto" style={{ color: Colours.WHITE }}>
				Connect Spotify Account
			</Button>
		</Center>
	)
}

export default HomeFocus
