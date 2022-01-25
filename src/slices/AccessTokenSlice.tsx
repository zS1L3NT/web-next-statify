import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iAccessTokenData = string | null

const slice = createSlice({
	name: "access_token",
	initialState: null as iAccessTokenData,
	reducers: {
		set_access_token: (state, action: PayloadAction<iAccessTokenData>) => {
			return action.payload
		}
	}
})

export const { set_access_token } = slice.actions
export default slice.reducer
