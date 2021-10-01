import React from "react"
import styled from "styled-components"
import BaseProps from "../../base-props"

export interface ImageProps extends BaseProps {
	src: string
	width?: string
	height?: string
}

export const StyledImage = styled.img<ImageProps>`
	${props => "width: " + props.width};
	${props => "height: " + props.height};
`

const Image = (props: ImageProps): JSX.Element => {
	return <StyledImage {...props} />
}

export default Image
