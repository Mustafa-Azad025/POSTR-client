import React from "react";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import SideHeader from "../components/Header/SideHeader";
import GroupHeader from "../components/Groups/GroupHeader";
import GroupMain from "../components/Groups/GroupMain";

function group() {
	const { data: session } = useSession();

	return (
		<>
			{session && (
				<div className="flex overflow-hidden">
					<SideHeader>
						<GroupHeader />
					</SideHeader>
					<GroupMain />
				</div>
			)}
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

export default group;
