interface iDrawerItem {
	id: string
	icon: JSX.Element
	title: string
	url: string
	condition: () => boolean
}

interface iDrawerDropdown {
	id: string
	icon: JSX.Element
	title: string
	drop: number
	items: iItem[]
	condition: () => boolean
}

interface iHomeCard {
	id: string
	header: string
	body: string
	url: string
}