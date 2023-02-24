import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./../graphql/apollo-client";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={pageProps.session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ApolloProvider>
	);
}

export default MyApp;
