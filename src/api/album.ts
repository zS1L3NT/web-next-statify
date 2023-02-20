import api, { RequireToken } from "./api"

const album = api.injectEndpoints({
	endpoints: builder => ({
		getAlbum: builder.query<SpotifyApi.AlbumObjectFull, { id: string } & RequireToken>({
			query: ({ token, ...args }) => ["getAlbum", [args], token]
		}),
		getAlbumTracks: builder.query<
			SpotifyApi.TrackObjectSimplified[],
			{ id: string; limit?: number; offset?: number } & RequireToken
		>({
			query: ({ token, ...args }) => ["getAlbumTracks", [args], token],
			transformResponse: response => response.items
		}),
		getIsInMySavedAlbums: builder.query<
			SpotifyApi.CheckUserSavedAlbumsResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["containsMySavedAlbums", [args], token],
			providesTags: ["SavedAlbums"]
		}),
		addToMySavedAlbums: builder.mutation<
			SpotifyApi.SaveAlbumsForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["addToMySavedAlbums", [args], token],
			invalidatesTags: ["SavedAlbums"]
		}),
		removeFromMySavedAlbums: builder.mutation<
			SpotifyApi.RemoveAlbumsForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ...args }) => ["removeFromMySavedAlbums", [args], token],
			invalidatesTags: ["SavedAlbums"]
		})
	})
})

export const {
	useAddToMySavedAlbumsMutation,
	useGetAlbumQuery,
	useGetAlbumTracksQuery,
	useGetIsInMySavedAlbumsQuery,
	useRemoveFromMySavedAlbumsMutation
} = album
