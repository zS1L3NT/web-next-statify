"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function Playlist({
	images,
	name,
	description,
	href,
}: {
	images?: string[]
	name: string
	description: string
	href: string
}) {
	const pathname = usePathname()

	return (
		<div className="w-full">
			<Link
				className={cn(
					"flex items-center gap-3 p-2 rounded-md cursor-pointer md:hover:bg-muted",
					pathname === href && "bg-zinc-900",
				)}
				href={pathname === href ? "/dashboard/playlists" : href}>
				{images?.length === 4 ? (
					<div className="grid grid-cols-2 size-[72px] md:size-[48px]">
						<Image
							className="md:rounded-tl-sm md:size-[24px]"
							src={images[0]!}
							alt={`${name} Cover 1`}
							width={36}
							height={36}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-tr-sm md:size-[24px]"
							src={images[1]!}
							alt={`${name} Cover 2`}
							width={36}
							height={36}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-bl-sm md:size-[24px]"
							src={images[2]!}
							alt={`${name} Cover 3`}
							width={36}
							height={36}
							fetchPriority="high"
						/>
						<Image
							className="md:rounded-br-sm md:size-[24px]"
							src={images[3]!}
							alt={`${name} Cover 4`}
							width={36}
							height={36}
							fetchPriority="high"
						/>
					</div>
				) : images ? (
					<Image
						className="md:rounded-sm md:size-[48px]"
						src={images[0]!}
						alt={`${name} Cover`}
						width={72}
						height={72}
					/>
				) : (
					<Skeleton className="size-[72px] md:size-[48px] md:rounded-sm" />
				)}
				<div className="flex-1">
					<h3 className="font-medium md:font-normal">{name}</h3>
					<p className="text-xs md:text-sm text-muted-foreground">{description}</p>
				</div>
			</Link>
		</div>
	)
}
