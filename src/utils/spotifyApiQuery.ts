import SpotifyWebApi from "spotify-web-api-js"

import { BaseQueryFn } from "@reduxjs/toolkit/query/react"

export default (async ([func, args, token]) => {
	const spotifyApi = new SpotifyWebApi()
	spotifyApi.setAccessToken(token)

	// @ts-ignore
	return await spotifyApi[func](...args)
}) satisfies BaseQueryFn<
	[func: keyof SpotifyWebApi.SpotifyWebApiJs, args: any[], token: string],
	unknown,
	object
>
