import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type iErrorData = {
	name: string
	message: string
} | null

const slice = createSlice({
	name: "error",
	initialState: null as iErrorData,
	reducers: {
		setError: (state, action: PayloadAction<Error | null>) => {
			if (action.payload) {
				const response_str = (action.payload as any).response
				if (response_str) {
					const [err, response] = _useTry(() => JSON.parse(response_str))
					if (err) {
						return {
							name: "Error",
							message: response
						}
					} else {
						return {
							name: `HTTP Error ${response.error.status}`,
							message: response.error.message
						}
					}
				} else {
					return {
						name: action.payload.name,
						message: action.payload.message
					}
				}
			} else {
				return null
			}
		}
	}
})

export const { setError } = slice.actions
export default slice.reducer
