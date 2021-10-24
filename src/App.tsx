import React from "react"
import { Route, Switch } from "react-router"
import Home from "./components/Home"
import Navigator from "./components/Navigator"

function App(): JSX.Element {
	return (
		<div className="w-100 h-100">
			<Navigator />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</div>
	)
}

export default App
