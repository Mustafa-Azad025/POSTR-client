import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import ChatProvide from "../context/ChatManage";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChatProvide>
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={pageProps.session}>
					<Component {...pageProps} />
				</SessionProvider>
			</QueryClientProvider>
		</ChatProvide>
	);
}

export default MyApp;
