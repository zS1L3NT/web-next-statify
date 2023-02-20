import SpotifyWebApi from "spotify-web-api-js"

import { BaseQueryFn } from "@reduxjs/toolkit/query/react"

import { setError } from "../slices/ErrorSlice"

export default (async ([func, args, token], { dispatch }) => {
	const spotifyApi = new SpotifyWebApi()
	spotifyApi.setAccessToken(token)

	try {
		// @ts-ignore
		return await spotifyApi[func](...args)
	} catch (err) {
		dispatch(setError(err as Error))
	}
}) satisfies BaseQueryFn<
	[func: keyof SpotifyWebApi.SpotifyWebApiJs, args: any[], token: string],
	unknown,
	object
>
