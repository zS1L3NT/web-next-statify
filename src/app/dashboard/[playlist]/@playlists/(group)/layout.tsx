import Image from "next/image"
import { PropsWithChildren } from "react"

import Icons from "@/components/icons"
import { getSession } from "@/lib/auth"

export default async function Layout({ children }: PropsWithChildren) {
	const session = await getSession()
	if (!session) return <></>

	return (
		<>
			<section className="fixed top-0 flex items-center w-full gap-2 p-4 pt-12 shadow-xl bg-background shadow-black md:hidden">
				<Image
					className="rounded-full"
					src={session.user.picture}
					alt="Profile picture"
					width={32}
					height={32}
					priority
				/>
				<h3 className="text-xl font-bold">Your Statistics</h3>
			</section>

			<section className="p-2 bg-background overscroll-x-none mt-24 md:m-2 md:h-[calc(100%-16px)] md:w-[30%] md:max-w-[360px] md:rounded-lg">
				<div className="hidden gap-3 pt-2 pb-4 ml-[20px] md:flex">
					<Icons.libraryOpen className="fill-muted-foreground size-6" />
					<h3 className="text-lg text-muted-foreground">Your Statistics</h3>
				</div>

				{children}
			</section>
		</>
	)
}
