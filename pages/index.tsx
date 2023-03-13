import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import SideHeader from "../components/Header/SideHeader";
import HomePage from "../components/Home/HomePage";
import Feed from "../components/Home/Feed";

const Home: NextPage = ({ session }: any) => {
	return (
		<>
			<Head>
				<title>PostR Home Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{session ? (
				<div className="flex overflow-hidden">
					<SideHeader>
						<HomePage />
					</SideHeader>
					<Feed />
				</div>
			) : (
				<h2 className="w-[100vw] h-[100vh] items-center flex text-7xl font-bold">
					Sorry To Say <br /> Some Error Occured
				</h2>
			)}
		</>
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
