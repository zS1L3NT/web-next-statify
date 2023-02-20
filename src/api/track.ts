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
			query: ({ token, ...args }) => ["getMyTopTracks", [args], token]
		}),
		getTracks: builder.query<SpotifyApi.TrackObjectFull[], { ids: string[] } & RequireToken>({
			query: ({ token, ...args }) => ["getTracks", [args], token]
		}),
		getTrack: builder.query<SpotifyApi.TrackObjectFull, { id: string } & RequireToken>({
			query: ({ token, ...args }) => ["getTrack", [args], token]
		}),
		getIsInMySavedTracks: builder.query<
			SpotifyApi.CheckUsersSavedTracksResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["containsMySavedTracks", [args], token],
			providesTags: ["SavedTracks"]
		}),
		addToMySavedTracks: builder.mutation<
			SpotifyApi.SaveTracksForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["addToMySavedTracks", [args], token],
			invalidatesTags: ["SavedTracks"]
		}),
		removeFromMySavedTracks: builder.mutation<
			SpotifyApi.RemoveUsersSavedTracksResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["removeFromMySavedTracks", [args], token],
			invalidatesTags: ["SavedTracks"]
		})
	})
})

export const {
	useAddToMySavedTracksMutation,
	useGetIsInMySavedTracksQuery,
	useGetTopTracksQuery,
	useGetTrackQuery,
	useGetTracksQuery,
	useRemoveFromMySavedTracksMutation
} = track
