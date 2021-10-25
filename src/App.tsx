import React from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Route, Switch } from "react-router"
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

function App(): JSX.Element {
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
		</ThemeProvider>
	)
}

export default App
