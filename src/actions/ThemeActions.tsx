import { iSetTheme } from "../redux"

export const setTheme = (theme: "light" | "dark"): iSetTheme => ({
	type: "SET_THEME",
	payload: {
		theme
	}
})