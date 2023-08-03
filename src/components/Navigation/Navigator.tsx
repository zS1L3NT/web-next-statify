import React, { useState } from "react"

import {
	AccessTime,
	AccessTimeFilled,
	Audiotrack,
	DarkMode,
	History,
	Home,
	LightMode,
	Login,
	Logout,
	Person,
	Timeline,
} from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, IconButton, List, SwipeableDrawer, Toolbar, Typography } from "@mui/material"

import useAppSelector from "../../hooks/useAppSelector"
import DrawerDropdown from "./DrawerDropdown"
import DrawerItem from "./DrawerItem"

const Navigator = () => {
	const token = useAppSelector(state => state.token)
	const theme = useAppSelector(state => state.theme)
	const [open, setOpen] = useState(false)

	const data: (iDrawerItem | iDrawerDropdown)[] = [
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
			condition: () => !token,
		},
		{
			id: "nav-top-tracks",
			icon: <Audiotrack />,
			title: "Top Tracks",
			drop: 0,
			items: [
				{
					id: "nav-top-tracks-short-term",
					icon: <AccessTime />,
					title: "Last Month",
					url: "/top-tracks/short-term",
					condition: () => !!token,
				},
				{
					id: "nav-top-tracks-medium-term",
					icon: <AccessTimeFilled />,
					title: "Last 6 Months",
					url: "/top-tracks/medium-term",
					condition: () => !!token,
				},
				{
					id: "nav-top-tracks-long-term",
					icon: <Timeline />,
					title: "All Time",
					url: "/top-tracks/long-term",
					condition: () => !!token,
				},
			],
			condition: () => !!token,
		},
		{
			id: "nav-top-artists",
			icon: <Person />,
			title: "Top Artists",
			drop: 1,
			items: [
				{
					id: "nav-top-artists-short-term",
					icon: <AccessTime />,
					title: "Last Month",
					url: "/top-artists/short-term",
					condition: () => !!token,
				},
				{
					id: "nav-top-artists-medium-term",
					icon: <AccessTimeFilled />,
					title: "Last 6 Months",
					url: "/top-artists/medium-term",
					condition: () => !!token,
				},
				{
					id: "nav-top-artists-long-term",
					icon: <Timeline />,
					title: "All Time",
					url: "/top-artists/long-term",
					condition: () => !!token,
				},
			],
			condition: () => !!token,
		},
		{
			id: "nav-recents",
			icon: <History />,
			title: "Recently Played",
			url: "/recents",
			condition: () => !!token,
		},
		{
			id: "nav-to-light",
			icon: <LightMode />,
			title: "Light Mode",
			url: "/light",
			condition: () => theme === "dark",
		},
		{
			id: "nav-to-dark",
			icon: <DarkMode />,
			title: "Dark Mode",
			url: "/dark",
			condition: () => theme === "light",
		},
		{
			id: "nav-logout",
			icon: <Logout />,
			title: "Logout",
			url: "/logout",
			condition: () => !!token,
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
								<DrawerDropdown
									key={el.id}
									setOpen={setOpen}
									dropdown={el}
								/>
							) : (
								<DrawerItem
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

export default Navigator
