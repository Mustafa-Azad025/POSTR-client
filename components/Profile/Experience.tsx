import axios from "axios";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

function Experience({ handlePop, ids }: any) {
	const [profileData, setProfileData] = useState({
		id: ids,
		title: "",
		company: "",
		from: "",
		to: "",
		description: "",
	});

	const updateProfile = async () => {
		if (
			!profileData.id ||
			profileData.company.trim() == "" ||
			profileData.title.trim() == "" ||
			profileData.description.trim() == "" ||
			profileData.from.trim() == "" ||
			profileData.to.trim() == ""
		) {
			return;
		}
		const result = await axios.post(
			`http://localhost:5000/api/createexperience/`,
			profileData
		);
		if (result?.data) {
			handlePop(false);
		}
	};

	const handleInput = (e: any) => {
		const { name, value } = e.target;
		setProfileData({ ...profileData, [name]: value });
	};

	return (
		<div className="w-full right-0 left-0 mx-auto top-[5%] rounded bg-white shadow-md backdrop-blur absolute z-30 max-w-2xl">
			<ImCancelCircle
				onClick={() => handlePop(false)}
				className="text-primary w-6 h-6 cursor-pointer relative top-6 left-4 z-40"
			/>
			<div
				className="flex flex-col items-start justify-start p-6 bg-white shadow-2xl rounded-xl
            relative z-10"
			>
				<p className="w-full text-4xl font-medium text-center leading-snug font-serif">
					Experience
				</p>
				<div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
					<div className="relative">
						<p
							className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
						>
							title
						</p>
						<input
							placeholder="Mustafa"
							type="text"
							name="title"
							onChange={(e: any) => handleInput(e)}
							className="border placeholder-mid focus:outline-none
							focus:border-dark w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
							border-mid/50 rounded-md"
						/>
					</div>
					<div className="relative">
						<p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
							company
						</p>
						<input
							placeholder="mustafaazad.me"
							type="text"
							name="company"
							onChange={(e: any) => handleInput(e)}
							className="border placeholder-mid focus:outline-none
							focus:border-dark w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
							border-mid/50 rounded-md"
						/>
					</div>
					<div className="relative">
						<p
							className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
						>
							from
						</p>
						<input
							placeholder="Enter Your Address"
							type="text"
							name="from"
							onChange={(e: any) => handleInput(e)}
							className="border placeholder-mid focus:outline-none
							focus:border-dark w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
							border-mid/50 rounded-md"
						/>
					</div>
					<div className="relative">
						<p
							className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
						>
							to
						</p>
						<input
							placeholder="Enter Your Skills with ,"
							type="text"
							name="to"
							onChange={(e: any) => handleInput(e)}
							className="border placeholder-mid focus:outline-none
							focus:border-dark w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
							border-mid/50 rounded-md"
						/>
					</div>
					<div className="relative">
						<p
							className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
						>
							description
						</p>
						<textarea
							name="description"
							onChange={(e: any) => handleInput(e)}
							className="border placeholder-mid focus:outline-none
                  focus:border-dark w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-mid/50 rounded-md"
						>
							Message . . .
						</textarea>
					</div>
					<div className="relative">
						<button
							disabled={
								!profileData.id ||
								profileData.company.trim() == "" ||
								profileData.title.trim() == "" ||
								profileData.to.trim() == "" ||
								profileData.from.trim() == "" ||
								profileData.description.trim() == ""
							}
							onClick={() => updateProfile()}
							className="w-full disabled:bg-secondary disabled:cursor-not-allowed inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-primary
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Experience;
