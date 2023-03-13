import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Hero from "../components/Login/Hero";

export default function login() {
	const [login, setLogin] = useState<boolean>(false);
	const handleGoogleAuth = async () => {
		signIn("google", {
			callbackUrl: "https://postrapp.vercel.app/",
		});
	};
	const handleGithubAuth = async () => {
		signIn("github", {
			callbackUrl: "https://postrapp.vercel.app/",
		});
	};
	const handleDiscordAuth = async () => {
		signIn("discord", {
			callbackUrl: "https://postrapp.vercel.app/",
		});
	};
	const handleLinkedinAuth = async () => {
		signIn("linkedin", {
			callbackUrl: "https://postrapp.vercel.app/",
		});
	};

	if (login) {
		return (
			<>
				<div className="overflow-hidden w-[100vw] h-[100vh]">
					<div className="bg-[#f5f5f5] w-full h-full grid lg:grid-cols-2 ">
						<div className="m-auto space-y-6">
							<Image
								src="/brand.png"
								width={350}
								height={120}
								alt="facebook icon"
							/>
							<p className="max-w-[37rem] text-xl h-16 md:text-3xl">
								Building Bridges, Not Walls.
								<br />
								Fill Gaps By Connecting The World's.
							</p>
						</div>
						<div className="my-auto py-2">
							<form className="md:w-2/3 bg-[#fff] m-auto space-y-4 rounded-lg p-8 shadow-xl">
								<button
									type="button"
									onClick={handleGoogleAuth}
									className="w-full rounded-lg px-5 py-3 text-lg border-2 item-center flex justify-evenly font-semibold text-black"
								>
									<Image
										src="/google.png"
										alt="google"
										width={30}
										height={30}
									/>
									Sign in With Google
								</button>
								<button
									type="button"
									onClick={handleGithubAuth}
									className="w-full rounded-lg px-5 py-3 text-lg item-center flex justify-evenly border-2 font-semibold text-black"
								>
									<Image
										src="/github.png"
										alt="github"
										width={30}
										height={30}
									/>
									Sign in With Github
								</button>
								<button
									type="button"
									onClick={handleDiscordAuth}
									className="w-full rounded-lg px-5 py-3 text-lg item-center flex justify-evenly border-2 font-semibold text-black"
								>
									<Image
										src="/discord.png"
										alt="discord"
										width={30}
										height={30}
									/>
									Sign in With Discord
								</button>
								<button
									type="button"
									onClick={handleLinkedinAuth}
									className="w-full rounded-lg px-5 py-3 text-lg item-center flex justify-evenly border-2 font-semibold text-black"
								>
									<Image
										src="/linkedin.png"
										alt="linkedin"
										width={30}
										height={30}
									/>
									Sign in With Linkedin
								</button>
							</form>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="scrollbar-hide">
				<div className=" w-full h-auto overflow-hidden scrollbar-hide scroll-smooth">
					<Hero handleLog={(e: boolean) => setLogin(e)} />
				</div>
			</div>
		);
	}
}
