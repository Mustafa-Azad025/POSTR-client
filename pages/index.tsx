import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useSession, getSession, signOut } from "next-auth/react";

const Home: NextPage = () => {
	const { data: session } = useSession();
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>PostR Home Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{session ? (
				<div
					className="flex overflow-hidden scrollbar-hide"
					onClick={() => signOut()}
				>
					sign out
				</div>
			) : (
				<h2 className="w-[100vw] h-[100vh] items-center flex text-7xl font-bold">
					Sorry To Say <br /> Some Error Occured
				</h2>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
};

export default Home;
