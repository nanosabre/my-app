import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CognitoProvider({
            clientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
            clientSecret: null,
            issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
            client: {
                token_endpoint_auth_method: "none"
            },
            authorization: { params: { scope: "openid email profile" } },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                };
            },
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            else if (new URL(url).origin === process.env.NEXT_PUBLIC_COGNITO_REDIRECT) return url
            return baseUrl
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.id = profile.sub;
                token.name = profile['cognito:username'] || profile.username;
                token.email = profile.email;
            }
            return token;
        },
        // Pass the JWT details to the active Session
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }