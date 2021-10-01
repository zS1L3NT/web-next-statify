import React from "react"
import styled from "styled-components"
import BaseProps from "../../base-props"

export interface TextProps extends BaseProps {
	size: "paragraph" | "regular" | "medium" | "large" | "jumbo"
	color: string
	center?: any
}

export const StyledJumboText = styled.h1<TextProps>`
	color: ${props => props.color};
	${props => props.center ? "text-align: center;" : ""}
	width: fit-content;
	font-size: 80px;
	font-weight: 1000;
	font-family: GothamStrong;

	@media (max-width: 480px) {
		font-size: 64px;
	}
`

export const StyledLargeText = styled.h1<TextProps>`
	color: ${props => props.color};
	${props => props.center ? "text-align: center;" : ""}
	width: fit-content;
	font-size: 56px;
	font-family: GothamBold;

	@media (max-width: 480px) {
		font-size: 44px;
	}
`

export const StyledMediumText = styled.h2<TextProps>`
	color: ${props => props.color};
	${props => props.center ? "text-align: center;" : ""}
	width: fit-content;
	font-size: 32px;
	font-family: GothamRegular;

	@media (max-width: 480px) {
		font-size: 20px;
	}
`

export const StyledRegularText = styled.h3<TextProps>`
	color: ${props => props.color};
	${props => props.center ? "text-align: center;" : ""}
	width: fit-content;
	font-size: 20px;
	font-family: GothamThin;

	@media (max-width: 480px) {
		font-size: 16px;
	}
`

export const StyledParagraphText = styled.p<TextProps>`
	color: ${props => props.color};
	${props => props.center ? "text-align: center;" : ""}
	width: fit-content;
	font-size: 16px;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`

const Text = (props: TextProps): JSX.Element => {
	switch (props.size) {
		case "paragraph":
			return <StyledParagraphText {...props} />
		case "regular":
			return <StyledRegularText {...props} />
		case "medium":
			return <StyledMediumText {...props} />
		case "large":
			return <StyledLargeText {...props} />
		case "jumbo":
			return <StyledJumboText {...props} />
		default:
			return <></>
	}
}

export default Text
