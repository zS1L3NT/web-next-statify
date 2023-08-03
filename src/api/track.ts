import api, { RequireToken } from "./api"

const track = api.injectEndpoints({
	endpoints: builder => ({
		getTopTracks: builder.query<
			SpotifyApi.TrackObjectFull[],
			{
				limit?: number
				offset?: number
				time_range: "short_term" | "medium_term" | "long_term"
			} & RequireToken
		>({
			query: ({ token, ...args }) => ["getMyTopTracks", [args], token],
			transformResponse: res => res.items,
		}),
		getTracks: builder.query<SpotifyApi.TrackObjectFull[], { ids: string[] } & RequireToken>({
			query: ({ token, ids }) => ["getTracks", [ids], token],
			transformResponse: res => res.tracks,
		}),
		getTrack: builder.query<SpotifyApi.TrackObjectFull, { id: string } & RequireToken>({
			query: ({ token, id }) => ["getTrack", [id], token],
		}),
		getIsInMySavedTracks: builder.query<
			SpotifyApi.CheckUsersSavedTracksResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["containsMySavedTracks", [ids], token],
			providesTags: ["SavedTracks"],
		}),
		addToMySavedTracks: builder.mutation<
			SpotifyApi.SaveTracksForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["addToMySavedTracks", [ids], token],
			invalidatesTags: ["SavedTracks"],
		}),
		removeFromMySavedTracks: builder.mutation<
			SpotifyApi.RemoveUsersSavedTracksResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["removeFromMySavedTracks", [ids], token],
			invalidatesTags: ["SavedTracks"],
		}),
	}),
})

export const {
	useAddToMySavedTracksMutation,
	useGetIsInMySavedTracksQuery,
	useGetTopTracksQuery,
	useGetTrackQuery,
	useGetTracksQuery,
	useRemoveFromMySavedTracksMutation,
} = track
