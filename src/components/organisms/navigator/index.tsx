import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useSelector } from "react-redux"
import Image from "../../atoms/image"
import "./index.css"

const Navigator = (): JSX.Element => {
	const credentials = useSelector(state => state.access_token)

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<Image />
					Statify
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{credentials && (
							<>
								<Nav.Link href="/top-tracks">Top Tracks</Nav.Link>
								<Nav.Link href="/top-artists">Top Artists</Nav.Link>
								<Nav.Link href="/recently-played">Recently Played</Nav.Link>
							</>
						)}
					</Nav>
					<Nav>
						{credentials ? (
							<Nav.Link href="/logout">Logout</Nav.Link>
						) : (
							<Nav.Link href="/login">Login</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigator
