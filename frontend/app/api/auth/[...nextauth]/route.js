import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Here you would normally look up the user in your database
                // and verify the password hash using bcrypt, etc.
                // For demonstration purposes, we accept any credentials
                // and return a simulated standard user payload.
                if (credentials?.email && credentials?.password) {
                    const user = {
                        id: "1",
                        name: credentials.email.split("@")[0],
                        email: credentials.email,
                        image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y", // default avatar
                    };
                    return user;
                }
                return null;
            },
        }),
    ],
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
