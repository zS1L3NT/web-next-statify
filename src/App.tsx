import React from "react"
import { Route, Switch } from "react-router"
import Navigator from "./components/organisms/navigator"
import Home from "./components/pages/home"

function App(): JSX.Element {
	return (
		<>
			<Navigator />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</>
	)
}

export default App
