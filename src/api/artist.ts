import api, { RequireToken } from "./api"

const artist = api.injectEndpoints({
	endpoints: builder => ({
		getTopArtists: builder.query<
			SpotifyApi.ArtistObjectFull[],
			{
				limit?: number
				offset?: number
				time_range: "short_term" | "medium_term" | "long_term"
			} & RequireToken
		>({
			query: ({ token, ...args }) => ["getMyTopArtists", [args], token]
		}),
		getArtists: builder.query<SpotifyApi.ArtistObjectFull[], { ids: string[] } & RequireToken>({
			query: ({ token, ...args }) => ["getArtists", [args], token]
		}),
		getArtist: builder.query<SpotifyApi.ArtistObjectFull, { id: string } & RequireToken>({
			query: ({ token, ...args }) => ["getArtist", [args], token]
		}),
		getArtistTopTracks: builder.query<
			SpotifyApi.TrackObjectFull[],
			{ id: string } & RequireToken
		>({
			query: ({ token, ...args }) => ["getArtistTopTracks", [args], token]
		}),
		getIsFollowingArtists: builder.query<
			SpotifyApi.UserFollowsUsersOrArtistsResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["isFollowingArtists", [args], token],
			providesTags: ["SavedArtists"]
		}),
		followArtists: builder.mutation<
			SpotifyApi.FollowArtistsOrUsersResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["followArtists", [args], token],
			invalidatesTags: ["SavedArtists"]
		}),
		unfollowArtists: builder.mutation<
			SpotifyApi.UnfollowArtistsOrUsersResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["unfollowArtists", [args], token],
			invalidatesTags: ["SavedArtists"]
		})
	})
})

export const {
	useFollowArtistsMutation,
	useGetArtistQuery,
	useGetArtistTopTracksQuery,
	useGetArtistsQuery,
	useGetIsFollowingArtistsQuery,
	useGetTopArtistsQuery,
	useUnfollowArtistsMutation
} = artist
