import { iSetError } from "../redux"

export const set_error = (error: Error | null): iSetError => ({
	type: "SET_ERROR",
	payload: {
		error
	}
})
