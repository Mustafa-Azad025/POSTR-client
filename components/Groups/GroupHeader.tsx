import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import {
	MdGroupAdd,
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import MakeGroupPopup from "./MakeGroupPopup";
import { useQuery } from "react-query";
import { getUser } from "../../lib/getUser";
import FetchGroup from "./FetchGroup";
import { useChat } from "./../../context/ChatManage";

function GroupHeader() {
	const [pop, setPop] = useState(false);
	const [menu, setMenu] = useState(false);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const { isLoading, isError, data, error } = useQuery("users", getUser);
	const { setCurrentUser } = useChat();
	const id = data?.filter((item: any) => {
		if (item.name == name && item.email == email) {
			return item._id;
		}
	});
	useEffect(() => {
		data?.filter((item: any) => {
			if (item.name == name && item.email == email) {
				setCurrentUser(item);
				return item;
			}
		});
	}, []);

	const handlesignout = () => {
		signOut();
	};
	return (
		<>
			<div className="bg-light w-full h-screen rounded-r-3xl z-20">
				<div className="max-w-[20rem] sm:max-w-[22rem] sm:w-[17rem] w-[16rem] rounded-r-3xl">
					<button
						onClick={() => setPop(true)}
						className="w-[80%] mx-auto mt-10 justify-between flex items-center bg-primary hover:bg-primary/70 rounded-3xl rounded-r-2xl text-white pr-4 group:"
					>
						<MdGroupAdd className="w-12 h-12 bg-primary hover:bg-primary/70 text-white rounded-full p-2" />
						<h3 className="font-medium text-lg">Make Groups</h3>
					</button>
					<h2 className="font-medium mt-8 ml-6 border-b border-b-dark w-56 pb-1">
						Groups
					</h2>
					{pop && (
						<MakeGroupPopup
							handlefunc={(e: boolean) => setPop(e)}
							datas={data}
							ids={id?.[0]?._id}
						/>
					)}
					<FetchGroup />
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

export default GroupHeader;
