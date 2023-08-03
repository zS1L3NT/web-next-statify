import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iTokenData = string | null

const slice = createSlice({
	name: "token",
	initialState: (localStorage.getItem("token") ?? null) as iTokenData,
	reducers: {
		setToken: (state, action: PayloadAction<iTokenData>) => {
			return action.payload
		},
	},
})

export const { setToken } = slice.actions
export default slice.reducer
