import { iSetAccessToken } from "../redux"

export const set_access_token = (access_token: string | null): iSetAccessToken => ({
	type: "SET_ACCESS_TOKEN",
	payload: {
		access_token
	}
})
