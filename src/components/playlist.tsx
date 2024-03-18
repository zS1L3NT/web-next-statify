import Image from "next/image"

export default function Playlist({
	images,
	name,
	description,
}: {
	images: string[]
	name: string
	description: string
}) {
	return (
		<div className="w-full">
			<div className="flex items-center gap-3 p-2 rounded-md cursor-pointer md:hover:bg-accent">
				{images.length === 4 ? (
					<div className="grid grid-cols-2 size-[72px] md:size-[48px]">
						<Image
							className="md:rounded-tl-sm md:size-[24px]"
							src={images[0]!}
							alt="Playlist cover 1"
							width={36}
							height={36}
						/>
						<Image
							className="md:rounded-tr-sm md:size-[24px]"
							src={images[1]!}
							alt="Playlist cover 2"
							width={36}
							height={36}
						/>
						<Image
							className="md:rounded-bl-sm md:size-[24px]"
							src={images[2]!}
							alt="Playlist cover 3"
							width={36}
							height={36}
						/>
						<Image
							className="md:rounded-br-sm md:size-[24px]"
							src={images[3]!}
							alt="Playlist cover 4"
							width={36}
							height={36}
						/>
					</div>
				) : (
					<Image
						className="md:rounded-sm md:size-[48px]"
						src={images[0]!}
						alt="Playlist cover"
						width={72}
						height={72}
					/>
				)}
				<div>
					<h3 className="font-medium md:font-normal">{name}</h3>
					<p className="text-xs md:text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</div>
	)
}
