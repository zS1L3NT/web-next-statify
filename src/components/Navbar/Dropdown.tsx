import Link from "next/link"
import React, { Dispatch, SetStateAction, useState } from "react"

import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { iNavbarItem } from "./Item"

export type iNavbarDropdown = {
	id: string
	icon: JSX.Element
	title: string
	drop: number
	items: iNavbarItem[]
	condition: () => boolean
}

export default function Dropdown({
	setOpen,
	dropdown,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
	dropdown: iNavbarDropdown
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	return dropdown.condition() ? (
		<React.Fragment key={dropdown.id}>
			<ListItemButton onClick={() => setDropdownOpen(!dropdownOpen)}>
				<ListItemIcon>{dropdown.icon}</ListItemIcon>
				<ListItemText primary={dropdown.title} />
				{dropdownOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse
				in={dropdownOpen}
				timeout="auto"
				unmountOnExit>
				<List
					component="div"
					disablePadding>
					{dropdown.items.map(item =>
						item.condition() ? (
							<ListItemButton
								key={item.id}
								LinkComponent={Link}
								href={item.url}
								sx={{ pl: 4 }}
								onClick={() => setOpen(false)}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						) : (
							<></>
						),
					)}
				</List>
			</Collapse>
		</React.Fragment>
	) : (
		<></>
	)
}
