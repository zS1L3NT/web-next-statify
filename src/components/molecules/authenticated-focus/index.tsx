import React from "react"
import { RingLoader } from "react-spinners"
import Colours from "../../../styles/Colours"
import Text from "../../atoms/text"

const AuthenticatedFocus = (): JSX.Element => {
	return (
		<>
			<Text size="large" color={Colours.PRIMARY}>
				Authenticating...
			</Text>
			<div style={{ margin: "2em auto", width: "120px", height: "120px" }}>
				<RingLoader color={Colours.PRIMARY} size={120} />
			</div>
		</>
	)
}

export default AuthenticatedFocus