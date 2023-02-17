import { createApi } from "@reduxjs/toolkit/query/react"

import spotifyApiQuery from "../utils/spotifyApiQuery"

export type RequireToken = {
	token: string
}

const api = createApi({
	reducerPath: "api",
	baseQuery: spotifyApiQuery,
	tagTypes: ["SavedTracks", "SavedArtists", "SavedAlbums"],
	endpoints: builder => ({
		getRecents: builder.query<SpotifyApi.PlayHistoryObject[], RequireToken>({
			query: ({ token }) => ["getMyRecentlyPlayedTracks", [{}], token]
		}),
		getRecommendations: builder.query<
			SpotifyApi.RecommendationsFromSeedsResponse,
			{
				seed_artists?: string[]
				seed_tracks?: string[]
				limit?: number
			} & RequireToken
		>({
			query: ({ token, ...args }) => ["getRecommendations", [args], token]
		})
	})
})

export default api
export const { useGetRecentsQuery, useGetRecommendationsQuery } = api
