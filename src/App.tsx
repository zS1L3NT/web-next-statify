import React from "react"
import { Route, Switch } from "react-router"
import Navigator from "./components/organisms/navigator"
import Home from "./components/pages/home"
import Authenticated from "./components/pages/authenticated"

function App(): JSX.Element {
	return (
		<>
			<Navigator />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/authenticated" component={Authenticated} />
			</Switch>
		</>
	)
}

export default App
