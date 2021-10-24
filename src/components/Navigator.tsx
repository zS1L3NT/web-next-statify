import React, { useState } from "react"
import {
	AppBar,
	Box,
	Collapse,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import {
	AccessTime,
	Audiotrack,
	Person,
	History,
	ExpandLess,
	ExpandMore,
	AccessTimeFilled,
	Timeline,
	Home,
	Login,
	Logout
} from "@mui/icons-material"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

interface iItem {
	icon: JSX.Element
	title: string
	url: string
	condition: () => boolean
}

interface iDropdown {
	icon: JSX.Element
	title: string
	drop: number
	items: iItem[]
	condition: () => boolean
}

const Navigator = (): JSX.Element => {
	const [open, setOpen] = useState(false)
	const [dropdowns, setDropdowns] = useState([false, false])
	const history = useHistory()
	const access_token = useSelector(state => state.access_token)

	const data: (iItem | iDropdown)[] = [
		{
			icon: <Home />,
			title: "Home",
			url: "/",
			condition: () => true
		},
		{
			icon: <Login />,
			title: "Login",
			url: "/login",
			condition: () => !access_token
		},
		{
			icon: <Audiotrack />,
			title: "Top Tracks",
			drop: 0,
			items: [
				{
					icon: <AccessTime />,
					title: "Past 4 Weeks",
					url: "/top-tracks/short-term",
					condition: () => !!access_token
				},
				{
					icon: <AccessTimeFilled />,
					title: "Past 6 Months",
					url: "/top-tracks/medium-term",
					condition: () => !!access_token
				},
				{
					icon: <Timeline />,
					title: "All Time",
					url: "/top-tracks/long-term",
					condition: () => !!access_token
				}
			],
			condition: () => !!access_token
		},
		{
			icon: <Person />,
			title: "Top Artists",
			drop: 1,
			items: [
				{
					icon: <AccessTime />,
					title: "Past 4 Weeks",
					url: "/top-artists/short-term",
					condition: () => !!access_token
				},
				{
					icon: <AccessTimeFilled />,
					title: "Past 6 Months",
					url: "/top-artists/medium-term",
					condition: () => !!access_token
				},
				{
					icon: <Timeline />,
					title: "All Time",
					url: "/top-artists/long-term",
					condition: () => !!access_token
				}
			],
			condition: () => !!access_token
		},
		{
			icon: <History />,
			title: "Recently Played",
			url: "/recently-played",
			condition: () => !!access_token
		},
		{
			icon: <Logout />,
			title: "Logout",
			url: "/logout",
			condition: () => !!access_token
		}
	]

	const toggleDropdown = (i: number) => {
		const drops_ = [...dropdowns]
		drops_[i] = !drops_[i]
		setDropdowns(drops_)
	}

	const redirect = (url: string) => {
		history.push(url)
		setOpen(false)
	}

	return (
		<>
			<AppBar position="relative">
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
			<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
				<Box sx={{ width: 250 }} role="presentation">
					<List
						subheader={
							<Typography sx={{ px: 3, py: 2 }} variant="h4">
								Statify
							</Typography>
						}>
						{data.map(
							item =>
								item.condition() && (
									<>
										<ListItemButton
											key={item.title}
											onClick={() =>
												"url" in item ? redirect(item.url) : toggleDropdown(item.drop)
											}>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.title} />
											{!("drop" in item) ? null : dropdowns[item.drop] ? (
												<ExpandLess />
											) : (
												<ExpandMore />
											)}
										</ListItemButton>
										{"drop" in item && (
											<Collapse in={dropdowns[item.drop]} timeout="auto" unmountOnExit>
												<List component="div" disablePadding>
													{item.items.map(
														item =>
															item.condition() && (
																<ListItemButton
																	key={item.title}
																	sx={{ pl: 4 }}
																	onClick={() => redirect(item.url)}>
																	<ListItemIcon>{item.icon}</ListItemIcon>
																	<ListItemText primary={item.title} />
																</ListItemButton>
															)
													)}
												</List>
											</Collapse>
										)}
									</>
								)
						)}
					</List>
				</Box>
			</Drawer>
		</>
	)
}

export default Navigator
