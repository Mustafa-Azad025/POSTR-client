import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import ChatProvide from "../context/ChatManage";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				<ChatProvide>
					<Component {...pageProps} />
				</ChatProvide>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
