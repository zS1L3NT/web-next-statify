import React, { Dispatch, SetStateAction } from "react"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Props {
	setOpen: Dispatch<SetStateAction<boolean>>
	item: iDrawerItem
}

const NavItem: React.FC<Props> = (props: Props) => {
	const { setOpen, item } = props

	const navigate = useNavigate()

	const redirect = (url: string) => {
		navigate(url)
		setOpen(false)
	}

	return item.condition() ? (
		<React.Fragment key={item.id}>
			<ListItemButton onClick={() => redirect(item.url)}>
				<ListItemIcon>{item.icon}</ListItemIcon>
				<ListItemText primary={item.title} />
			</ListItemButton>
		</React.Fragment>
	) : (
		<></>
	)
}

export default NavItem
