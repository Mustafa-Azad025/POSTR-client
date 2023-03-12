import {
	MdOutlineCancel,
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Menu from "./Menu";
import Notify from "./Notify";
import SearchMenu from "../Utils/SearchMenu";
import { useQuery } from "react-query";
import { getUser } from "../../lib/getUser";
import { useChat } from "../../context/ChatManage";

function HomePage() {
	const [notifi, setNotifi] = useState(true);
	const [menu, setMenu] = useState(false);
	const { data: session } = useSession();
	const { image, name, email }: any = session?.user;
	const { isLoading, isError, data, error } = useQuery("users", getUser);
	const { setCurrentUser, currentUser } = useChat();
	const cuserData = data?.filter((item: any) => {
		if (item.name == name && item.email == email) {
			return item;
		}
	});
	useEffect(() => {
		setCurrentUser(cuserData);
	}, [cuserData]);

	return (
		<div className="bg-light w-full h-screen rounded-r-3xl z-20">
			<div>
				<SearchMenu />
			</div>
			{notifi && (
				<div className="max-w-[16rem] sm:max-w-[18rem] bg-white p-2 mt-10 rounded-xl mx-2">
					<div className="flex justify-between">
						<div className="items-center mx-3 space-y-[0.2rem]">
							<Image
								src="/brand.png"
								width={90}
								height={50}
								className="w-20 h-5"
								alt="socialmediaicon"
							/>
							<p className="font-semibold text-sm text-center">About App</p>
						</div>
						<MdOutlineCancel
							size="1.5rem"
							onClick={() => setNotifi(false)}
							className="hover:text-mid text-dark cursor-pointer"
						/>
					</div>
					<Notify />
				</div>
			)}
			<h2 className="text-sm font-medium mt-6 ml-4">Recent Notification</h2>
			<div className="item-center text-center text-xs text-mid mt-16">
				No Notification Now
			</div>
			{menu && <Menu ids={currentUser?.[0]?._id} />}
			<div
				onClick={() => setMenu(!menu)}
				className="flex justify-between bg-primary select-none absolute bottom-0 left-0 max-w-[21rem] sm:max-w-sm z-50 w-full rounded-r-3xl p-1 py-2 xl:py-3 items-center"
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
	);
}
export default HomePage;
