import React, { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

const NavItem = ({
	setOpen,
	item,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
	item: iDrawerItem
}) => {
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
