import React, { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

interface Props {
	setOpen: Dispatch<SetStateAction<boolean>>
	dropdown: iDrawerDropdown
}

const DrawerDropdown: React.FC<Props> = (props: Props) => {
	const { setOpen, dropdown } = props

	const navigate = useNavigate()
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const redirect = (url: string) => {
		navigate(url)
		setOpen(false)
	}

	return dropdown.condition() ? (
		<React.Fragment key={dropdown.id}>
			<ListItemButton onClick={() => setDropdownOpen(!dropdownOpen)}>
				<ListItemIcon>{dropdown.icon}</ListItemIcon>
				<ListItemText primary={dropdown.title} />
				{dropdownOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{dropdown.items.map(item =>
						item.condition() ? (
							<ListItemButton
								key={item.id}
								sx={{ pl: 4 }}
								onClick={() => redirect(item.url)}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						) : (
							<></>
						)
					)}
				</List>
			</Collapse>
		</React.Fragment>
	) : (
		<></>
	)
}

export default DrawerDropdown
