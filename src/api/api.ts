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
			query: ({ token }) => ["getMyRecentlyPlayedTracks", [{ limit: 50 }], token],
			transformResponse: res => res.items,
		}),
		getRecommendations: builder.query<
			SpotifyApi.RecommendationsFromSeedsResponse,
			{
				seed_artists?: string[]
				seed_tracks?: string[]
				limit?: number
			} & RequireToken
		>({
			query: ({ token, ...args }) => [
				"getRecommendations",
				[
					{
						...(args.seed_artists && { seed_artists: args.seed_artists.join(",") }),
						...(args.seed_tracks && { seed_tracks: args.seed_tracks.join(",") }),
						...(args.limit && { limit: args.limit }),
					},
				],
				token,
			],
		}),
	}),
})

export default api
export const { useGetRecentsQuery, useGetRecommendationsQuery } = api
