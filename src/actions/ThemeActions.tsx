import { iSetTheme } from "../redux"

export const set_theme = (theme: "light" | "dark"): iSetTheme => ({
	type: "SET_THEME",
	payload: {
		theme
	}
})
