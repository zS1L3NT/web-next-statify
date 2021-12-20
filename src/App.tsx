import Album from "./pages/Album"
import Artist from "./pages/Artist"
import Dark from "./pages/Dark"
import Home from "./pages/Home"
import Light from "./pages/Light"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Navigator from "./components/Navigation/Navigator"
import React, { useEffect, useState } from "react"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import TopArtists from "./pages/TopArtists"
import TopTracks from "./pages/TopTracks"
import Track from "./pages/Track"
import useThemeValue from "./hooks/useThemeValue"
import {
	Backdrop,
	Button,
	CssBaseline,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	ThemeProvider
} from "@mui/material"
import { dark, light } from "./theme"
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom"
import { set_error } from "./actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"

const App = (): JSX.Element => {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()
	const error = useSelector(state => state.error)
	const [err, setErr] = useState<Error>()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (error) setErr(error)
	}, [error])

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [location])
	//#endregion

	//#region Functions
	const handleRetry = () => {
		dispatch(set_error(null))

		// If is a id not found error, don't set the redirect path and don't logout
		if (!err?.message.endsWith(" not found")) {
			sessionStorage.setItem("redirect", history.location.pathname)
			setTimeout(() => history.push("/logout"), 500)
		} else {
			setTimeout(() => history.push("/"), 500)
		}
	}

	const handleHome = () => {
		dispatch(set_error(null))
		history.push("/")
	}
	//#endregion

	return (
		<ThemeProvider theme={useThemeValue(dark, light)}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/top-tracks/short-term" component={TopTracks} />
					<Redirect exact path="/top-tracks" to="/top-tracks/short-term" />
					<Route exact path="/top-tracks/medium-term" component={TopTracks} />
					<Route exact path="/top-tracks/long-term" component={TopTracks} />
					<Route exact path="/top-artists/short-term" component={TopArtists} />
					<Redirect exact path="/top-artists" to="/top-artists/short-term" />
					<Route exact path="/top-artists/medium-term" component={TopArtists} />
					<Route exact path="/top-artists/long-term" component={TopArtists} />
					<Route exact path="/recents" component={RecentlyPlayed} />
					<Route exact path="/dark" component={Dark} />
					<Route exact path="/light" component={Light} />
					<Route exact path="/track/:id" component={Track} />
					<Route exact path="/artist/:id" component={Artist} />
					<Route exact path="/album/:id" component={Album} />
					<Redirect exact path="*" to="/" />
				</Switch>
			</div>
			<Dialog open={!!error} BackdropComponent={Backdrop} fullWidth>
				<DialogTitle>{err?.name || ""}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{err?.message || ""}
						<br />
						{err?.message.endsWith(" not found")
							? "You will be redirected home"
							: "You will be signed out"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{err?.message.endsWith(" not found") ? null : (
						<Button onClick={handleHome}>Home</Button>
					)}
					<Button onClick={handleRetry}>Retry</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	)
}

export const tabs = [
	{
		term: "short_term",
		description: "Past 4 Weeks"
	},
	{
		term: "medium_term",
		description: "Past 6 Months"
	},
	{
		term: "long_term",
		description: "All Time"
	}
] as const

export default App
