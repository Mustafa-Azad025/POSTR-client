import React, { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import Experience from "./Experience";
import Education from "./Education";
import SocialMedia from "./SocialMedia";
import { HiPencilAlt } from "react-icons/hi";
import { IoPersonSharp } from "react-icons/io5";
import { CgLoadbarDoc } from "react-icons/cg";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useQuery } from "react-query";
import { getUser } from "../../lib/getUser";
import { useSession } from "next-auth/react";

function MainProfile(ids: any) {
	const { isLoading, isError, data, error } = useQuery("users", getUser);
	const { data: session } = useSession();
	const [profilePopup, setProfilePopup] = useState<boolean>(false);
	const [experiencePopup, setExperiencePopup] = useState<boolean>(false);
	const [eduPopup, setEduPopup] = useState<boolean>(false);
	const [socialPopup, setSocialPopup] = useState<boolean>(false);
	const user = data?.filter((item: any) => {
		if (
			item.name == session?.user?.name &&
			item.email == session?.user?.email
		) {
			return item;
		}
	});
	const [fullProfile, setFullProfile]: any = useState();
	const createProfile = async () => {
		try {
			await axios.post(`http://localhost:5000/api/createProfile/`, {
				id: ids?.ids,
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		createProfile();
	}, []);

	const getProfile = async () => {
		try {
			const res = await axios.post(
				`http://localhost:5000/api/getprofilesingle/`,
				{
					id: ids?.ids,
				}
			);
			setFullProfile(res?.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, [
		fullProfile?._id,
		fullProfile?.experience,
		fullProfile?.education,
		fullProfile?.social,
		profilePopup,
		experiencePopup,
		eduPopup,
		socialPopup,
		fullProfile,
	]);
	return (
		<div className="h-[100vh] overflow-y-scroll overflow-x-hidden scrollbar-hide">
			<div className="container max-w-[90vw] mx-auto my-5 p-5">
				<div className="md:flex no-wrap md:-mx-2 ">
					<div className="w-full md:w-3/12 md:mx-2">
						<div className="bg-white p-3 border-t-4 border-green-400">
							<div className="image overflow-hidden">
								<Image
									width={100}
									height={100}
									className="h-auto w-full mx-auto"
									src={fullProfile?.user?.image}
									alt={fullProfile?.user?.name}
								/>
							</div>
							<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
								{fullProfile?.user?.name}
							</h1>
							<h3 className="text-gray-600 font-lg text-semibold leading-6">
								{fullProfile?.company}
							</h3>
							<p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
								{fullProfile?.bio}
							</p>
							<ul className="bg-light hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
								<li className="flex items-center py-3">
									<span>Status</span>
									<span className="ml-auto">
										<span className="bg-secondary py-1 px-2 rounded text-white text-sm">
											Active
										</span>
									</span>
								</li>
								<li className="flex items-center py-3">
									<span>Member since</span>
									<span className="ml-auto">
										{moment(fullProfile?.createdAt).format("MMMM Do YYYY")}
									</span>
								</li>
							</ul>
						</div>
						<div className="my-4"></div>
					</div>
					<div className="w-full md:w-9/12 mx-2 h-64">
						<div className="bg-white p-3 shadow-sm rounded-sm">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
									<span className="text-green-500">
										<IoPersonSharp className="w-6 h-6 text-primary mr-5" />
									</span>
									<span className="tracking-wide">About Me</span>
								</div>
								{fullProfile?.user?._id === user?._id &&
									fullProfile?.user?.email === user?.email &&
									fullProfile?.user?.name === user?.name && (
										<HiPencilAlt
											onClick={() => setProfilePopup(true)}
											className="w-5 h-5 cursor-pointer text-primary"
										/>
									)}
								{fullProfile?.user?._id === user?._id &&
									fullProfile?.user?.email === user?.email &&
									fullProfile?.user?.name === user?.name &&
									profilePopup && (
										<ProfileSection
											ids={ids?.ids}
											handlePop={(e: boolean) => setProfilePopup(e)}
										/>
									)}
							</div>
							<div className="text-gray-700">
								<div className="grid md:grid-cols-2 text-sm">
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">Name</div>
										<div className="px-4 py-2">{fullProfile?.user?.name}</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">Email</div>
										<div className="px-4 py-2">{fullProfile?.user?.email}</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Company/college
										</div>
										<div className="px-4 py-2">{fullProfile?.company}</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">Website</div>
										<div className="px-4 py-2">{fullProfile?.website}</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">Address</div>
										<div className="px-4 py-2">{fullProfile?.location}</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">Skills</div>
										<div className="px-4 py-2 space-x-1 max-w-full w-full grid grid-cols-2 mx-auto h-[6rem] overflow-y-scroll overflow-x-hidden scrollbar-hide">
											{fullProfile?.skills?.split(",").map((skill: string) => (
												<span
													key={skill}
													className="bg-secondary text-white px-2 py-1 my-1 h-[1.25rem] rounded flex items-center w-auto truncate text-sm"
												>
													{skill.trim()}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white shadow mt-6 rounded-lg p-6">
								<div className="flex items-center justify-between w-full">
									<h3 className="text-gray-600 text-sm font-semibold mb-4">
										Follow Me On :
									</h3>
									{fullProfile?.user?._id === user?._id &&
										fullProfile?.user?.email === user?.email &&
										fullProfile?.user?.name === user?.name && (
											<HiPencilAlt
												onClick={() => setSocialPopup(true)}
												className="w-5 h-5 text-primary cursor-pointer"
											/>
										)}
									{fullProfile?.user?._id === user?._id &&
										fullProfile?.user?.email === user?.email &&
										fullProfile?.user?.name === user?.name &&
										socialPopup && (
											<SocialMedia
												ids={ids?.ids}
												handlePop={(e: boolean) => setSocialPopup(e)}
											/>
										)}
								</div>
								<ul className="flex items-center justify-center space-x-2">
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.github?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.github?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.github?.name}
										</span>
									</li>
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.youtube?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.youtube?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.youtube?.name}
										</span>
									</li>
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.facebook?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.facebook?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.facebook?.name}
										</span>
									</li>
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.twitter?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.twitter?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.twitter?.name}
										</span>
									</li>
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.instagram?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.instagram?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.instagram?.name}
										</span>
									</li>
									<li className="flex flex-col items-center space-y-2">
										<Link
											className="block bg-white p-1 rounded-full"
											href={`${fullProfile?.social?.linkedin?.link}`}
										>
											<img
												className="w-10 object-contain p-1 rounded-full text-primary"
												src={fullProfile?.social?.linkedin?.icon}
											/>
										</Link>
										<span className="text-xs text-gray-500">
											{fullProfile?.social?.linkedin?.name}
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className="my-4"></div>
						<div className="bg-white p-3 shadow-sm rounded-sm">
							<div className="grid md:grid-cols-2 grid-cols-1 space-y-6 md:space-y-0 ">
								<div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
											<span className="text-green-500">
												<CgLoadbarDoc className="w-5 h-5 text-primary" />
											</span>
											<span className="tracking-wide">Experience</span>
										</div>
										<div className="flex items-center">
											{fullProfile?.user?._id === user?._id &&
												fullProfile?.user?.email === user?.email &&
												fullProfile?.user?.name === user?.name && (
													<HiPencilAlt
														onClick={() => setExperiencePopup(true)}
														className="w-5 h-5 text-primary sm:mr-8 mb-2 cursor-pointer"
													/>
												)}
											{fullProfile?.user?._id === user?._id &&
												fullProfile?.user?.email === user?.email &&
												fullProfile?.user?.name === user?.name &&
												experiencePopup && (
													<Experience
														handlePop={(e: boolean) =>
															setExperiencePopup(false)
														}
														ids={ids?.ids}
													/>
												)}
										</div>
									</div>
									<ul className="list-inside space-y-2 h-[7rem] overflow-y-scroll overflow-x-hidden scrollbar-hide">
										{fullProfile?.experience?.map((exp: any) => (
											<li key={exp?._id}>
												<div className="text-primary font-bold text-lg">
													{exp?.title}
												</div>
												<div className="text-dark text-sm font-semibold">
													{exp?.company}
												</div>
												<div className="text-dark text-[0.75rem]">
													{exp?.from} - {exp?.to}
												</div>
												<div className="text-dark text-sm">
													{exp?.description}
												</div>
											</li>
										))}
									</ul>
								</div>
								<div>
									<div className="flex justify-between items-center">
										<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
											<span className="text-green-500">
												<svg
													className="h-5 text-primary"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
													<path
														fill="#fff"
														d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
													/>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
													/>
												</svg>
											</span>
											<span className="tracking-wide">Education</span>
										</div>
										<div className="flex items-center">
											{fullProfile?.user?._id === user?._id &&
												fullProfile?.user?.email === user?.email &&
												fullProfile?.user?.name === user?.name && (
													<HiPencilAlt
														onClick={() => setEduPopup(true)}
														className="w-5 h-5 cursor-pointer text-primary sm:mr-8 mb-2"
													/>
												)}
											{fullProfile?.user?._id === user?._id &&
												fullProfile?.user?.email === user?.email &&
												fullProfile?.user?.name === user?.name &&
												eduPopup && (
													<Education
														handlePop={(e: boolean) => setEduPopup(e)}
														ids={ids?.ids}
													/>
												)}
										</div>
									</div>
									<ul className="list-inside space-y-2">
										{fullProfile?.education?.map((edu: any) => (
											<li key={edu?._id}>
												<div className="text-primary font-bold text-lg">
													{edu?.school}
												</div>
												<div className="text-dark text-sm font-semibold">
													{edu?.degree} - {edu?.fieldofstudy}
												</div>
												<div className="text-dark text-[0.75rem]">
													{edu?.from} - {edu?.to}
												</div>
												<div className="text-dark text-sm">
													{edu?.description}
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainProfile;
