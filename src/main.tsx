import React from "react"
import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import store from "./store"

createRoot(document.getElementById("root")!).render(
	<ReduxProvider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ReduxProvider>,
)
