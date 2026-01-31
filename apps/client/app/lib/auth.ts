import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { Account, Profile, User } from "next-auth";
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
                            email: existingUser.email,
                            phone: existingUser.number
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
                        email: user.email,
                        phone: user.number
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
        async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
            if (account?.provider === "google") {
                try {
                    const existingUser = await db.user.findFirst({
                        where: {
                            email: user.email || ""
                        }
                    });

                    if (!existingUser && user.email) {
                        await db.user.create({
                            data: {
                                email: user.email,
                                name: user.name || "",
                                number: "",
                                password: ""
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error saving user:", error);
                    return false; // Reject sign-in on error
                }
            }
            return true; // Allow sign-in
        },
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                if (user.email) {
                    const dbUser = await db.user.findFirst({
                        where: {
                            email: user.email
                        }
                    });
                    if (dbUser) {
                        token.sub = dbUser.id.toString();
                    }
                }
            }
            return token;
        },
        async session({ token, session }: { token: JWT, session: Session }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.sub;
            }

            return session
        }
    }
}
