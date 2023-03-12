import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../../components/Profile/Navbar";
import MainProfile from "../../components/Profile/MainProfile";
import { useRouter } from "next/router";

function profile() {
	const router = useRouter();
	const { mail } = router.query;
	return (
		<>
			<div className="flex sm:space-x-4 lg:space-x-8">
				<Navbar />
				<MainProfile ids={mail} />
			</div>
		</>
	);
}

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
		props: {},
	};
};
export default profile;
