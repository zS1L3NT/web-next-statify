import React from "react"
import styled from "styled-components"
import Colours from "../../../styles/Colours"
import BaseProps from "../../base-props"

interface ButtonProps extends BaseProps {
	variant: "primary" | "secondary"
	size: "medium" | "large"
}

const StyledButton = styled.button<ButtonProps>`
	background-color: ${props => (props.variant === "primary" ? Colours.PRIMARY : Colours.SECONDARY)};
	padding: ${props => (props.size === "medium" ? "14px 32px" : "17px 48px")};
	font-size: ${props => (props.size === "medium" ? "15px" : "16px")};
	font-family: GothamRegular;
	border-radius: 35px;
	border: none;
	&:hover {
		transform: scale(1.02);
		filter: brightness(1.04);
	}

	@media (max-width: 480px) {
		padding: ${props => (props.size === "medium" ? "14px 28px" : "17px 40px")};
		font-size: ${props => (props.size === "medium" ? "14px" : "15px")};
	}
`

const Button = (props: ButtonProps): JSX.Element => {
	return <StyledButton {...props} />
}

export default Button