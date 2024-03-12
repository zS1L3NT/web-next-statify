import NextAuth from "next-auth"

import { options } from "@/next-auth"

const handler = NextAuth(options)

export { handler as GET, handler as POST }
