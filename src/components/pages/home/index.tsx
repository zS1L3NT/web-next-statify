import React from "react"
import HomeFocus from "../../molecules/home-focus"
import Image from "../../atoms/image"
import "./index.css"
import Colours from "../../../styles/Colours"
import Center from "../../particles/center"

const Home = (): JSX.Element => {
	return (
		<Center className="w-100 h-100" style={{ backgroundColor: Colours.GREY }}>
			<div className="home-flex d-flex justify-content-around px-5">
				<Image className="image statify-image" src="/assets/images/statify.svg" />
				<HomeFocus />
				<Image className="image spotify-image" src="/assets/images/spotify.svg" />
			</div>
		</Center>
	)
}

export default Home
