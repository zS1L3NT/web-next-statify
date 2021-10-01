import { ReactNode } from "react"

export default interface BaseProps {
	id?: string
	style?: { [key: string]: any }
	children?: ReactNode
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}
