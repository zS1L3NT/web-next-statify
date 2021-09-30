export type iInitialAccessToken = string | null

export interface iSetAccessToken {
	type: "SET_ACCESS_TOKEN"
	payload: {
		access_token: string | null
	}
}

export type iAccessTokenActions = iSetAccessToken