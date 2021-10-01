import React from "react"
import BaseProps from "../../base-props"

interface CenterProps extends BaseProps {
}

const Center = (props: CenterProps): JSX.Element => {
	return (
		<div {...props} className={"d-flex justify-content-center align-items-center " + props.className}>
			<div>{props.children}</div>
		</div>
	)
}

export default Center
