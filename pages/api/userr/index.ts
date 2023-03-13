import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import connectDB from "./../../../database/connect";
import Users from "../../../models/userModel";
import { getSession } from "next-auth/react";
type Data = {
	name: string;
};

connectDB();
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method }: any = req;
	if (method == "GET") {
		try {
			const data = await Users.find({});
			if (!data) {
				res.status(404).json({ error: "No Data Found" } as any);
			}
			res.status(200).json(data as any);
		} catch (error) {
			res.status(404).json({ error: "Error While Fetching" } as any);
		}
	}
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
		props: {
			session,
		},
	};
};
