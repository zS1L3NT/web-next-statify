import { iErrorActions, iErrorData } from "../redux"
import { Reducer } from "redux"
import { useTry as uuseTry } from "no-try"

const initial_state: iErrorData = null

const reducer: Reducer<iErrorData, iErrorActions> = (
	state = initial_state,
	action: iErrorActions
) => {
	switch (action.type) {
		case "SET_ERROR":
			if (action.payload.error) {
				const response_str = (action.payload.error as any).response
				if (response_str) {
					const [err, response] = uuseTry(() => JSON.parse(response_str))
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
						name: action.payload.error.name,
						message: action.payload.error.message
					}
				}
			} else {
				return null
			}
		default:
			return state
	}
}

export default reducer
