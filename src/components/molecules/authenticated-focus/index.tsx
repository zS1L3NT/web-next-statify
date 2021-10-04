import React from "react"
import { ScaleLoader } from "react-spinners"
import Colours from "../../../styles/Colours"
import Text from "../../atoms/text"

const AuthenticatedFocus = (): JSX.Element => {
	return (
		<>
			<Text size="large" color={Colours.PRIMARY}>
				Authenticating...
			</Text>
			<div style={{ margin: "2em auto", width: "fit-content", height: "fit-content" }}>
				<ScaleLoader color={Colours.PRIMARY} height={80} width={8} radius={8} margin={4} />
			</div>
		</>
	)
}

export default AuthenticatedFocus