import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import SearchMenu from "./../Utils/SearchMenu";
import FetchData from "./FetchData";
import { useQuery } from "react-query";
import { getUser } from "../../lib/getUser";

function ChatHead() {
	const { isLoading, isError, data, error } = useQuery("users", getUser);

	const [menu, setMenu] = useState(false);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const id = data?.filter((item: any) => {
		if (item.name == name && item.email == email) {
			return item._id;
		}
	});

	const handlesignout = () => {
		signOut();
	};
	return (
		<>
			<div className="bg-light w-full h-screen rounded-r-3xl z-20">
				<div className="">
					<SearchMenu />
					<h2 className="font-medium mt-8 ml-6 border-b border-b-dark w-56 pb-1">
						Chats
					</h2>
					<FetchData datass={data} name={name} email={email} />
				</div>
				{menu && (
					<div className="absolute bottom-14 select-none left-0 max-w-[19rem] sm:max-w-[22rem] z-50 w-full rounded-r-3xl p-1 items-center">
						<Link href={`/profile/${id?.[0]?._id}`}>
						<div className="rounded-lg flex justify-between px-4 py-2 text-sm font-medium text-dark bg-white hover:bg-secondary hover:text-mid">
							Profile
							<RiEdit2Fill />
						</div>
						</Link>

						<div
							onClick={handlesignout}
							className="rounded-lg px-4 flex justify-between py-2 text-sm font-medium text-dark bg-white hover:bg-secondary hover:text-mid"
						>
							Logout
							<FiLogOut />
						</div>
					</div>
				)}
				<div
					onClick={() => setMenu(!menu)}
					className="flex justify-between select-none bg-primary absolute bottom-0 left-0 max-w-[20rem] sm:max-w-[22rem] z-50 w-full rounded-r-3xl p-1 py-2 xl:py-3 items-center"
				>
					<div className=" items-center flex space-x-8 z-50">
						<Image
							className="rounded-full bg-secondary p-1 cursor-pointer ml-4"
							src={image}
							width={40}
							height={40}
							alt={name}
						/>
						<p className="whitespace-nowrap text-white font-semibold z-50">
							{name}
						</p>
					</div>
					{menu ? (
						<MdOutlineKeyboardArrowDown size="1.6rem" className="text-white" />
					) : (
						<MdOutlineKeyboardArrowUp size="1.6rem" className="text-white" />
					)}
				</div>
			</div>
		</>
	);
}

export default ChatHead;
