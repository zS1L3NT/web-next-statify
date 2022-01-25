import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "react-service-worker"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

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

registerServiceWorker()
