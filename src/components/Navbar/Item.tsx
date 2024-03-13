import Link from "next/link"
import React, { Dispatch, SetStateAction } from "react"

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export type iNavbarItem = {
	id: string
	icon: JSX.Element
	title: string
	url: string
	condition: () => boolean
}

export default function Item({
	setOpen,
	item,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
	item: iNavbarItem
}) {
	return item.condition() ? (
		<React.Fragment key={item.id}>
			<ListItemButton
				LinkComponent={Link}
				href={item.url}
				onClick={() => setOpen(false)}>
				<ListItemIcon>{item.icon}</ListItemIcon>
				<ListItemText primary={item.title} />
			</ListItemButton>
		</React.Fragment>
	) : (
		<></>
	)
}
