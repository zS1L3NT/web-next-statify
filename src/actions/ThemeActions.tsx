import { iSetTheme, iThemeData } from "../redux"

export const set_theme = (theme: iThemeData): iSetTheme => ({
	type: "SET_THEME",
	payload: {
		theme
	}
})
