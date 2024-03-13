import Link from "next/link"
import React, { Dispatch, SetStateAction } from "react"

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export default function Item({
	setOpen,
	item,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>
	item: iDrawerItem
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
