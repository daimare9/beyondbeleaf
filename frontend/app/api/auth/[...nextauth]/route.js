import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                await dbConnect();

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Temporary bypass for the local test account
                if (credentials.email === "test@example.com" && credentials.password === "password") {
                    return {
                        id: "TEST_ADMIN_ID",
                        name: "Admin User",
                        email: "test@example.com",
                        role: "admin",
                        image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    };
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user || user.provider !== "credentials" || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // For OAuth providers like Google and Facebook, auto-create user in MongoDB
            if (account.provider === "google" || account.provider === "facebook") {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            provider: account.provider,
                            role: "user"
                        });
                    }
                } catch (error) {
                    console.log("Error checking if user exists: ", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            // Attach user roles and custom info to the jwt token
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Forward custom token properties to the client session
            if (session.user) {
                session.user.id = token.id;
                // If it's an OAuth user, we might not have 'role' in the initial token from OAuth,
                // so we handle default role or look it up.
                session.user.role = token.role || "user";
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev_only_replace_me",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
