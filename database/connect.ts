import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const { connection }: any = await mongoose.connect(
			process.env.MONGODB_URI as string
		);
		if (connection.readyState == 1) {
			// return Promise.resolve(true);
			console.log("Connected to MongoDB");
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

export default connectDB;
