import { iSetError } from "../redux"

export const setError = (error: Error | null): iSetError => ({
	type: "SET_ERROR",
	payload: {
		error
	}
})
