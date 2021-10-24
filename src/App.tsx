import React from "react"
import { Route, Switch } from "react-router"
import Home from "./components/Home"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Navigator from "./components/Navigator"

function App(): JSX.Element {
	return (
		<div className="w-100 h-100">
			<Navigator />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/logout" component={Logout} />
			</Switch>
		</div>
	)
}

export default App
