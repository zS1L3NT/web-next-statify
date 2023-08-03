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
			query: ({ token, ...args }) => ["getMyTopArtists", [args], token],
			transformResponse: res => res.items,
		}),
		getArtists: builder.query<SpotifyApi.ArtistObjectFull[], { ids: string[] } & RequireToken>({
			query: ({ token, ids }) => ["getArtists", [ids], token],
			transformResponse: res => res.artists,
		}),
		getArtist: builder.query<SpotifyApi.ArtistObjectFull, { id: string } & RequireToken>({
			query: ({ token, id }) => ["getArtist", [id], token],
		}),
		getArtistTopTracks: builder.query<
			SpotifyApi.TrackObjectFull[],
			{ id: string } & RequireToken
		>({
			query: ({ token, id }) => ["getArtistTopTracks", [id, "SG"], token],
			transformResponse: res => res.tracks,
		}),
		getIsFollowingArtists: builder.query<
			SpotifyApi.UserFollowsUsersOrArtistsResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["isFollowingArtists", [ids], token],
			providesTags: ["SavedArtists"],
		}),
		followArtists: builder.mutation<
			SpotifyApi.FollowArtistsOrUsersResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["followArtists", [ids], token],
			invalidatesTags: ["SavedArtists"],
		}),
		unfollowArtists: builder.mutation<
			SpotifyApi.UnfollowArtistsOrUsersResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["unfollowArtists", [ids], token],
			invalidatesTags: ["SavedArtists"],
		}),
	}),
})

export const {
	useFollowArtistsMutation,
	useGetArtistQuery,
	useGetArtistTopTracksQuery,
	useGetArtistsQuery,
	useGetIsFollowingArtistsQuery,
	useGetTopArtistsQuery,
	useUnfollowArtistsMutation,
} = artist
