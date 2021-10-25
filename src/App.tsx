import React, { useEffect, useState } from "react"
import { Backdrop, Box, CssBaseline, Fade, Modal, ThemeProvider, Typography } from "@mui/material"
import { Route, Switch, useHistory } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Navigator from "./components/Navigator"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import TopArtistsLongTerm from "./pages/TopArtistsLongTerm"
import TopArtistsMediumTerm from "./pages/TopArtistsMediumTerm"
import TopArtistsShortTerm from "./pages/TopArtistsShortTerm"
import TopTracksLongTerm from "./pages/TopTracksLongTerm"
import TopTracksMediumTerm from "./pages/TopTracksMediumTerm"
import TopTracksShortTerm from "./pages/TopTracksShortTerm"
import { dark, light } from "./theme"
import useThemeValue from "./hooks/useThemeValue"
import Dark from "./pages/Dark"
import Light from "./pages/Light"
import { useDispatch, useSelector } from "react-redux"
import { setError } from "./actions/ErrorActions"

function App(): JSX.Element {
	const [err, setErr] = useState<Error>()

	const dispatch = useDispatch()
	const history = useHistory()
	const error = useSelector(state => state.error)

	useEffect(() => {
		if (error) setErr(error)
	}, [error])

	return (
		<ThemeProvider theme={useThemeValue(dark, light)}>
			<CssBaseline />
			<div className="w-100 h-100">
				<Navigator />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/top-tracks/short-term" component={TopTracksShortTerm} />
					<Route exact path="/top-tracks/medium-term" component={TopTracksMediumTerm} />
					<Route exact path="/top-tracks/long-term" component={TopTracksLongTerm} />
					<Route exact path="/top-artists/short-term" component={TopArtistsShortTerm} />
					<Route exact path="/top-artists/medium-term" component={TopArtistsMediumTerm} />
					<Route exact path="/top-artists/long-term" component={TopArtistsLongTerm} />
					<Route exact path="/recently-played" component={RecentlyPlayed} />
					<Route exact path="/dark" component={Dark} />
					<Route exact path="/light" component={Light} />
				</Switch>
			</div>
			<Modal
				aria-labelledby="error-modal-title"
				aria-describedby="error-modal-description"
				open={!!error}
				onClose={() => {
					dispatch(setError(null))
					history.push("/logout")
				}}
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
