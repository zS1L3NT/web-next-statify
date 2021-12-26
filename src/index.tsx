import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import "./index.css"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

require("react-service-worker")()
