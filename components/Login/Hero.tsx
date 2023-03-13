import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdMarkAsUnread } from "react-icons/md";
import { RiChatSmile3Fill } from "react-icons/ri";
function Hero({ handleLog }: any) {
	return (
		<div className="scrollbar-hide">
			<header>
				<nav className="bg-[#0B0938] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
					<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
						<div className="flex items-center space-x-5">
							<Image
								src="/logo.png"
								width={40}
								height={40}
								className=""
								alt="PostR Logo"
							/>
							<span className="self-center text-white text-xl font-semibold whitespace-nowrap">
								PostR
							</span>
						</div>
					</div>
				</nav>
			</header>

			<section className="bg-[#0B0938]">
				<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
							A User-Friendly Social Media And Chat Platform
						</h1>
						<p className="max-w-2xl mb-6 font-light text-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
							Simple Social Media Webapp For Posting, Chating and Make Bonding
						</p>
						<div
							onClick={() => handleLog(true)}
							className="inline-flex cursor-pointer items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg hover:bg-primary"
						>
							Get started
							<svg
								className="w-5 h-5 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
						<p className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-dark border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
							By Mustafa Azad
						</p>
					</div>
					<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
						<Image width={450} height={450} src="/mobile.png" alt="mockup" />
					</div>
				</div>
			</section>

			<section className="bg-gray-50">
				<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
					<div className="max-w-screen-md mb-8 lg:mb-16">
						<h2 className="mb-4 text-4xl font-extrabold text-dark">
							Designed For Students And Professionals
						</h2>
						<p className="text-dark sm:text-xl">
							A social media and chat platform created for students and
							professionals with an easy-to-use interface.
						</p>
					</div>
					<div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
						<div>
							<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
								<svg
									className="w-5 h-5 text-primary lg:w-6 lg:h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-bold">Post</h3>
							<p className=" ">
								Post your thoughts, ideas, achievement, and opinions with a
								simple and user-friendly interface.
							</p>
						</div>
						<div>
							<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
								<MdMarkAsUnread className="w-5 h-5 text-primary lg:w-6 lg:h-6" />
							</div>
							<h3 className="mb-2 text-xl font-bold ">One-to-One Char</h3>
							<p className="">
								Chat with your friends, classmates, and colleagues in a simple
								and Interactive interface For Free.
							</p>
						</div>
						<div>
							<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
								<RiChatSmile3Fill className="w-5 h-5 text-primary lg:w-6 lg:h-6" />
							</div>
							<h3 className="mb-2 text-xl font-bold">Group Chat</h3>
							<p className="">
								Chat in groups with your friends by using simple and free
								interface.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-white dark:bg-dark">
				<div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
					<div className="font-light text-light sm:text-lg dark:text-gray-400">
						<h2 className="mb-4 text-4xl font-extrabold text-dark dark:text-white">
							I didn't reinvent the wheel
						</h2>
						<p className="mb-4">
							I just made it better. We've taken the best parts of the platforms
							you already know and love and made them better.
						</p>
					</div>
					<div className="mt-8">
						<Image
							src="/invent.png"
							width={450}
							height={450}
							alt="Invent image"
						/>
					</div>
				</div>
			</section>

			<footer className="p-4 bg-dark sm:p-6">
				<div className="mx-auto max-w-screen-xl">
					<hr className="my-6 border-primary sm:mx-auto lg:my-8" />
					<div className="sm:flex sm:items-center sm:justify-between">
						<span className="text-sm text-light sm:text-center dark:text-gray-400">
							© {new Date().getFullYear()}{" "}
							<Link href="mustafaazad.me" className="hover:underline">
								PostR-By Mustafa
							</Link>
							. All Rights Reserved.
						</span>
						<div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
							<Link
								href="https://www.instagram.com/webxcity/"
								className="text-light hover:text-dark "
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
							<Link
								href="https://twitter.com/MUSTAFAAZAD2003"
								className="text-light hover:text-dark"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</Link>
							<Link
								href="https://github.com/Mustafa-Azad025"
								className="text-light hover:text-dark "
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Hero;
