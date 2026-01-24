import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { prismaClient as db } from "@repo/db"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: "Name", type: "text", placeholder: "name" },
                email: { label: "Email", type: "text", placeholder: "email" },
                phone: { label: "Phone number", type: "text", placeholder: "phone" },
                password: { label: "Password", type: "password", placeholder: "min 8 characters" },
            },

            async authorize(credentials: any) {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number,
                            phone: existingUser.email
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            email: credentials.email,
                            password: hashedPassword,
                            name: credentials.name
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch (e) {
                    console.error(e);
                }

                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ token, session }: { token: JWT, session: Session }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.sub;
            }

            return session
        }
    }
}
