"use client"

import { SessionProvider, useSession } from "next-auth/react"
import React, { useState } from "react"

import { TERMS } from "@/utils"

import Dropdown, { iNavbarDropdown } from "./Dropdown"
import Item, { iNavbarItem } from "./Item"

export default function Navbar() {
	return (
		<SessionProvider>
			<_Navbar />
		</SessionProvider>
	)
}

function _Navbar() {
	const session = useSession()
	const hasSession = !!session
	const [open, setOpen] = useState(false)

	const data: (iNavbarItem | iNavbarDropdown)[] = [
		{
			id: "nav-home",
			icon: <Home />,
			title: "Home",
			url: "/",
			condition: () => true,
		},
		{
			id: "nav-login",
			icon: <Login />,
			title: "Login",
			url: "/login",
			condition: () => !hasSession,
		},
		{
			id: "nav-top-tracks",
			icon: <Audiotrack />,
			title: "Top Tracks",
			drop: 0,
			items: Object.entries(TERMS).map(([key, { description, icon: Icon }]) => ({
				id: `nav-top-tracks-${key}`,
				icon: <Icon />,
				title: description,
				url: `/top-tracks/${key}`,
				condition: () => !!hasSession,
			})),
			condition: () => !!hasSession,
		},
		{
			id: "nav-top-artists",
			icon: <Person />,
			title: "Top Artists",
			drop: 1,
			items: Object.entries(TERMS).map(([key, { description, icon: Icon }]) => ({
				id: `nav-top-artists-${key}`,
				icon: <Icon />,
				title: description,
				url: `/top-artists/${key}`,
				condition: () => !!hasSession,
			})),
			condition: () => !!hasSession,
		},
		{
			id: "nav-recents",
			icon: <History />,
			title: "Recently Played",
			url: "/recents",
			condition: () => !!hasSession,
		},
		{
			id: "nav-logout",
			icon: <Logout />,
			title: "Logout",
			url: "/logout",
			condition: () => !!hasSession,
		},
	]

	return (
		<>
			<AppBar
				sx={{ bgcolor: "primary.main" }}
				position="relative">
				<Toolbar>
					<IconButton
						onClick={() => setOpen(true)}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Statify</Typography>
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}>
				<Box
					sx={{ width: 250 }}
					role="presentation">
					<List
						subheader={
							<Typography
								sx={{ px: 3, py: 2 }}
								variant="h4">
								Statify
							</Typography>
						}>
						{data.map(el =>
							"drop" in el ? (
								<Dropdown
									key={el.id}
									setOpen={setOpen}
									dropdown={el}
								/>
							) : (
								<Item
									key={el.id}
									setOpen={setOpen}
									item={el}
								/>
							),
						)}
					</List>
				</Box>
			</SwipeableDrawer>
		</>
	)
}
