import React from "react"
import BaseProps from "../../base-props"

interface CenterProps extends BaseProps {
	max?: any
}

const Center = (props: CenterProps): JSX.Element => {
	return (
		<div
			{...props}
			className={
				"d-flex justify-content-center align-items-center " +
				(props.max ? "w-100 h-100 " : "") +
				(props.className || "")
			}>
			<div>{props.children}</div>
		</div>
	)
}

export default Center
