import React, { useEffect, useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Image from "../../atoms/image"
import "./index.css"

const config = require("../../../config.json")

const Navigator = (): JSX.Element => {
	const history = useHistory()
	const credentials = useSelector(state => state.access_token)
	const [spotifyUrl, setSpotifyUrl] = useState("")

	useEffect(() => {
		const query = new URLSearchParams({
			response_type: "code",
			client_id: config.spotify.clientId,
			redirect_uri: config.spotify.redirectUri,
			scope: "user-read-private"
		}).toString()

		setSpotifyUrl("https://accounts.spotify.com/authorize?" + query)
	}, [])

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand onClick={() => history.push("/")}>
					<Image src="/assets/images/statify.svg" width="36px" height="36px" style={{ marginRight: "1rem" }} />
					Statify
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{credentials && (
							<>
								<Nav.Link onClick={() => history.push("/top-tracks")}>Top Tracks</Nav.Link>
								<Nav.Link onClick={() => history.push("/top-artists")}>Top Artists</Nav.Link>
								<Nav.Link onClick={() => history.push("/recently-played")}>Recently Played</Nav.Link>
							</>
						)}
					</Nav>
					<Nav>
						{credentials ? (
							<Nav.Link onClick={() => history.push("/logout")}>Logout</Nav.Link>
						) : (
							<Nav.Link href={spotifyUrl}>Login</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigator
