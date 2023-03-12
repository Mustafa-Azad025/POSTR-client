import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import LinkedInProvider from "next-auth/providers/linkedin";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		}),
		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID as string,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.SECRET_KEY_FOR_AUTH,
};
export default NextAuth(authOptions);
