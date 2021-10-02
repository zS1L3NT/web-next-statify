import { iSetAccessToken } from "../redux"

export const setAccessToken = (access_token: string): iSetAccessToken => ({
	type: "SET_ACCESS_TOKEN",
	payload: {
		access_token
	}
})