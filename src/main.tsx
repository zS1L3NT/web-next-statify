import React from "react"
import ReactDOM from "react-dom"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import store from "./store"

ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReduxProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
