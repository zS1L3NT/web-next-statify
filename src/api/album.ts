import api, { RequireToken } from "./api"

const album = api.injectEndpoints({
	endpoints: builder => ({
		getAlbum: builder.query<SpotifyApi.AlbumObjectFull, { id: string } & RequireToken>({
			query: ({ token, id }) => ["getAlbum", [id], token],
		}),
		getAlbumTracks: builder.query<
			SpotifyApi.TrackObjectSimplified[],
			{ id: string; limit?: number; offset?: number } & RequireToken
		>({
			query: ({ token, id }) => ["getAlbumTracks", [id], token],
			transformResponse: res => res.items,
		}),
		getIsInMySavedAlbums: builder.query<
			SpotifyApi.CheckUserSavedAlbumsResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["containsMySavedAlbums", [ids], token],
			providesTags: ["SavedAlbums"],
		}),
		addToMySavedAlbums: builder.mutation<
			SpotifyApi.SaveAlbumsForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["addToMySavedAlbums", [ids], token],
			invalidatesTags: ["SavedAlbums"],
		}),
		removeFromMySavedAlbums: builder.mutation<
			SpotifyApi.RemoveAlbumsForUserResponse,
			{ ids: string[] } & RequireToken
		>({
			query: ({ token, ids }) => ["removeFromMySavedAlbums", [ids], token],
			invalidatesTags: ["SavedAlbums"],
		}),
	}),
})

export const {
	useAddToMySavedAlbumsMutation,
	useGetAlbumQuery,
	useGetAlbumTracksQuery,
	useGetIsInMySavedAlbumsQuery,
	useRemoveFromMySavedAlbumsMutation,
} = album
