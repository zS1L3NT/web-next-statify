import React, { Dispatch, SetStateAction } from "react"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useHistory } from "react-router-dom"

interface Props {
	setOpen: Dispatch<SetStateAction<boolean>>
	item: iDrawerItem
}

const NavItem: React.FC<Props> = (props: Props) => {
	const { setOpen, item } = props

	//#region Hooks
	const history = useHistory()
	//#endregion

	//#region Functions
	const redirect = (url: string) => {
		history.push(url)
		setOpen(false)
	}
	//#endregion

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
