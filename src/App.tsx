import Artist from "./pages/Artist"
import Dark from "./pages/Dark"
import Home from "./pages/Home"
import Light from "./pages/Light"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Navigator from "./components/Navigator"
import React, { useEffect, useState } from "react"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import TopArtists from "./pages/TopArtists"
import TopTracks from "./pages/TopTracks"
import Track from "./pages/Track"
import useThemeValue from "./hooks/useThemeValue"
import { Backdrop, Box, CssBaseline, Fade, Modal, ThemeProvider, Typography } from "@mui/material"
import { dark, light } from "./theme"
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { set_error } from "./actions/ErrorActions"
import { useDispatch, useSelector } from "react-redux"

function App(): JSX.Element {
	//#region Hooks
	const dispatch = useDispatch()
	const history = useHistory()
	const error = useSelector(state => state.error)
	const [err, setErr] = useState<Error>()
	//#endregion

	//#region Effects
	useEffect(() => {
		if (error) setErr(error)
	}, [error])
	//#endregion

	//#region Functions
	const handleErrorClose = () => {
		dispatch(set_error(null))
		sessionStorage.setItem("redirect", history.location.pathname)
		setTimeout(() => history.push("/logout"), 500)
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
					<Route exact path="/recently-played" component={RecentlyPlayed} />
					<Route exact path="/dark" component={Dark} />
					<Route exact path="/light" component={Light} />
					<Route exact path="/track/:id" component={Track} />
					<Route exact path="/artist/:id" component={Artist} />
					<Redirect exact path="*" to="/" />
				</Switch>
			</div>
			<Modal
				aria-labelledby="error-modal-title"
				aria-describedby="error-modal-description"
				open={!!error}
				onClose={handleErrorClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={!!error}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 400,
							bgcolor: "background.paper",
							border: "2px solid #000",
							boxShadow: 24,
							p: 4
						}}>
						<Typography id="error-modal-title" variant="h6" component="h2">
							{err?.name || ""}
						</Typography>
						<Typography id="error-modal-description" sx={{ mt: 2 }}>
							{err?.message || ""}
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</ThemeProvider>
	)
}

export default App
