import { iAccessTokenData, iSetAccessToken } from "../redux"

export const set_access_token = (access_token: iAccessTokenData): iSetAccessToken => ({
	type: "SET_ACCESS_TOKEN",
	payload: {
		access_token
	}
})
