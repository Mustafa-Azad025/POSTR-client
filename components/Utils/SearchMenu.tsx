import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import useclickOutside from "./clickOutside";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";
import ChatAccess from "../Chat/ChatAccess";
import axios from "axios";
import { getUser } from "../../lib/getUser";
import { useQuery } from "react-query";

function SearchMenu() {
	const { isLoading, isError, data, error } = useQuery("users", getUser);
	const [down, setDown] = useState(false);
	const [search, setSearch] = useState(false);
	const { data: session } = useSession();
	const { email, name }: any = session?.user;
	const router = useRouter();

	const el = useRef<HTMLDivElement>(null);
	useclickOutside({
		ref: el,
		func: () =>
			el.current == null ? el.current : (el.current.style.display = "none"),
	});

	const [searchResult, setSearchResult]: any = useState([]);
	const handleSearch = async (search: any) => {
		if (!search || search.trim() == "" || search.length < 3) {
			setSearchResult([]);
			return;
		} else {
			const result = await axios.get(
				`https://postr-server.vercel.app/chat/user?search=${search}`
			);
			setSearchResult(result.data);
		}
	};
	const current = data?.filter((item: any) => {
		if (item.name == name && item.email == email) {
			return item;
		}
	});
	const currentId = current?.[0]?._id;
	return (
		<>
			<div className="flex mt-7 sm:mt-8 items-center ml-6">
				<BiSearch
					onClick={() => setSearch(!search)}
					className={`w-6 h-6 relative z-30`}
				/>
				{router.pathname === "/chat" ? (
					<input
						type="search"
						name="text"
						onClick={() => {
							el.current == null
								? el.current
								: (el.current.style.display = "block");
							if (down == false) {
								setDown(true);
							}
						}}
						onChange={(e: any) => handleSearch(e.target.value)}
						className="p-1 sm:p-2 pl-10 sm:pl-14 -ml-8 rounded-3xl mr-2"
						placeholder="Search . . . ."
					/>
				) : (
					<input
						type="search"
						name="text"
						onClick={() => {
							el.current == null
								? el.current
								: (el.current.style.display = "block");
							if (down == false) {
								setDown(true);
							}
						}}
						onChange={(e: any) => handleSearch(e.target.value)}
						className="p-1 sm:p-2 pl-10 sm:pl-14 -ml-8 rounded-3xl mr-2"
						placeholder="Search . . . ."
					/>
				)}
			</div>
			<div ref={el}>
				{down && (
					<div className="absolute z-50 bg-white rounded-lg justify-center left-4 sm:left-24 xl:left-20 xl:w-[19rem] shadow-md lg:w-80 w-72 top-14 sm:top-20 min-h-[18rem] p-2 overflow-x-hidden overflow-y-scroll scrollbar-hide">
						<div className="flex fixed items-center justify-between w-72">
							<p className="font-medium select-none text-xs">
								Click Outside to exit
							</p>
							<p className=" font-medium select-none">Searching ....</p>
						</div>
						{router.pathname != "/chat" &&
							searchResult?.map((item: any) => {
								if (item.email == email && item.name == name) return;
								return (
									<a
										href={`/profile/${item?._id}`}
										key={item?._id}
										target="_blank"
									>
										<div className="flex justify-evenly mt-10 items-center">
											<div>
												<Image
													priority
													className="rounded-full"
													src={item.image}
													width={50}
													height={50}
													alt={item.name}
												/>
											</div>
											<h3 className="font-medium">{item.name}</h3>
											<AiOutlineRight />
										</div>
									</a>
								);
							})}
						{router.pathname == "/chat" &&
							searchResult?.map((item: any) => {
								if (item.email == email && item.name == name) {
									return;
								}
								return (
									<div className="mt-6">
										<ChatAccess
											key={item._id}
											ids={item._id}
											name={item.name}
											currentid={currentId}
											email={item.email}
											img={item.image}
										/>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</>
	);
}

export default SearchMenu;
