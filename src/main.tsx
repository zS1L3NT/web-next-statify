import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import store from "./store"

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
	api_host: import.meta.env.VITE_POSTHOG_HOST,
})

createRoot(document.getElementById("root")!).render(
	<PostHogProvider client={posthog}>
		<ReduxProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReduxProvider>
	</PostHogProvider>,
)
