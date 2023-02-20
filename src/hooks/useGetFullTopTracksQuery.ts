import { useGetTopTracksQuery } from "../api/track"

export default (
	{
		time_range,
		token
	}: {
		time_range: "short_term" | "medium_term" | "long_term"
		token: string
	},
	{ skip }: { skip?: boolean } = {}
) => {
	const { data: topTracksA } = useGetTopTracksQuery(
		{
			limit: 49,
			time_range,
			token
		},
		{ skip }
	)
	const { data: topTracksB } = useGetTopTracksQuery(
		{
			limit: 50,
			offset: 49,
			time_range,
			token
		},
		{ skip }
	)

	return {
		data: topTracksA && topTracksB ? [...topTracksA, ...topTracksB] : undefined
	}
}
