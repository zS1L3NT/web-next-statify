import { jwtVerify, SignJWT } from "jose"

import { Session } from "./auth"

export async function sign(session: Session): Promise<string> {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + 3600

	return new SignJWT(session)
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export async function verify(token: string): Promise<Session> {
	return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)).then(
		data => data.payload as Session,
	)
}
