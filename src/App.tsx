import React, { useEffect } from "react"
import { Route, Switch } from "react-router"
import Navigator from "./components/organisms/navigator"
import Home from "./components/pages/home"
import Authenticated from "./components/pages/authenticated"
import Colours from "./styles/Colours"
import Logout from "./components/pages/logout"
import TopTracks from "./components/pages/top-tracks"

function App(): JSX.Element {
	useEffect(() => {
		document.body.style.backgroundColor = Colours.GREY
	}, [])

	return (
		<div className="w-100 h-100">
			<Navigator />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/authenticated" component={Authenticated} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/top-tracks" component={TopTracks} />
			</Switch>
		</div>
	)
}

export default App
