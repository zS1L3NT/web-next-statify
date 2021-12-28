import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iThemeData = "light" | "dark"

const localStorageTheme = localStorage.getItem("theme") || ""

const slice = createSlice({
	name: "theme",
	initialState: (["light", "dark"].includes(localStorageTheme)
		? localStorageTheme
		: "dark") as iThemeData,
	reducers: {
		set_theme: (state, action: PayloadAction<iThemeData>) => {
			return action.payload
		}
	}
})

export const { set_theme } = slice.actions
export default slice.reducer
