import React from "react"
import { Route, Switch } from "react-router"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Navigator from "./components/Navigator"
import RecentlyPlayed from "./components/RecentlyPlayed"
import TopArtistsLongTerm from "./components/TopArtistsLongTerm"
import TopArtistsMediumTerm from "./components/TopArtistsMediumTerm"
import TopArtistsShortTerm from "./components/TopArtistsShortTerm"
import TopTracksLongTerm from "./components/TopTracksLongTerm"
import TopTracksMediumTerm from "./components/TopTracksMediumTerm"
import TopTracksShortTerm from "./components/TopTracksShortTerm"

function App(): JSX.Element {
	return (
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
			</Switch>
		</div>
	)
}

export default App
