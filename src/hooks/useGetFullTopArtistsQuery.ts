import { useGetTopArtistsQuery } from "../api/artist"

export default (
	{
		time_range,
		token,
	}: {
		time_range: "short_term" | "medium_term" | "long_term"
		token: string
	},
	{ skip }: { skip?: boolean } = {},
) => {
	const { data: topArtistsA } = useGetTopArtistsQuery(
		{
			limit: 49,
			time_range,
			token,
		},
		{ skip },
	)
	const { data: topArtistsB } = useGetTopArtistsQuery(
		{
			limit: 50,
			offset: 49,
			time_range,
			token,
		},
		{ skip },
	)

	return {
		data: topArtistsA && topArtistsB ? [...topArtistsA, ...topArtistsB] : undefined,
	}
}
