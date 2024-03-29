"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

import { TERMS } from "@/lib/utils"

export default function Client({
	term,
	picture,
	tracks,
}: {
	term: keyof typeof TERMS
	picture: string
	tracks: SpotifyApi.TrackObjectFull[]
}) {
	const { scrollY } = useScroll()
	const image = {
		scale: useTransform(scrollY, [0, 240], [1, 0.5]),
		opacity: useTransform(scrollY, [0, 240], [1, 0]),
		top: useTransform(scrollY, [0, 240], [64, 192]),
	}
	const appbar = {
		zIndex: useTransform(scrollY, [240, 241], [0, 20]),
	}
	const text = {
		opacity: useTransform(scrollY, [300, 340], [0, 1]),
		marginBottom: useTransform(scrollY, [300, 340], [8, 16]),
	}
	console.log(scrollY)

	const images = tracks.map(t => t.album.images[0]?.url).filter((i): i is string => !!i)

	return (
		<section className="absolute w-full bg-black md:flex-1 md:static">
			<motion.div
				className="fixed top-0 flex items-end justify-center w-full h-20 bg-black"
				style={appbar}>
				<motion.p style={text}>Top Tracks - {TERMS[term].description}</motion.p>
			</motion.div>

			<motion.div
				className="absolute w-full"
				style={image}>
				{images.length >= 4 ? (
					<div className="grid grid-cols-2 mx-auto size-[288px] md:size-[48px]">
						<Image
							className="md:rounded-tl-sm md:size-[24px]"
							src={images[0]!}
							alt="Playlist Cover 1"
							width={144}
							height={144}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-tr-sm md:size-[24px]"
							src={images[1]!}
							alt="Playlist Cover 2"
							width={144}
							height={144}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-bl-sm md:size-[24px]"
							src={images[2]!}
							alt="Playlist Cover 3"
							width={144}
							height={144}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-br-sm md:size-[24px]"
							src={images[3]!}
							alt="Playlist Cover 4"
							width={144}
							height={144}
							fetchPriority="high"
						/>
					</div>
				) : (
					<Image
						className="mx-auto mt-16 md:rounded-sm md:size-[48px]"
						src={images[0]!}
						alt="Playlist Cover"
						width={288}
						height={288}
					/>
				)}
			</motion.div>

			<div className="relative z-10 flex flex-col gap-2 mt-[360px]">
				<h3 className="ml-4 text-2xl font-extrabold">
					Top Tracks - {TERMS[term].description}
				</h3>
				<div className="flex items-center gap-3 ml-4">
					<Image
						src={picture}
						alt="Profile"
						className="rounded-full"
						width={20}
						height={20}
					/>
					<p className="font-semibold">Zechariah</p>
				</div>
			</div>

			<div className="flex flex-col gap-4 mt-8">
				{tracks.map(t => (
					<div
						key={t.id}
						className="flex gap-2 px-4">
						<Image
							src={t.album.images[0]?.url ?? ""}
							alt="Album Cover"
							width={48}
							height={48}
						/>
						<div className="flex flex-col justify-center">
							<h4 className="font-medium leading-5">{t.name}</h4>
							<p className="text-sm leading-4 text-muted-foreground">
								{t.artists[0]?.name}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
