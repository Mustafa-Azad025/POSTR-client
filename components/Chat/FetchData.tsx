import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { useChat } from "./../../context/ChatManage";

function FetchData({ datass, name, email }: any) {
	const {
		selectedChat,
		setSelectedChat,
		chats,
		setChats,
		setCurrentUser,
	}: any = useChat();
	const currentData = datass?.filter((item: any) => {
		return item.name == name && item.email == email;
	});
	const id = currentData?.[0]?._id;
	const datas = async () => {
		const data = await axios.post(
			`https://postr-server.vercel.app/api/messagefetch/`,
			{
				id: id,
			}
		);
		setChats(data?.data);
	};
	useEffect(() => {
		datas();
		setCurrentUser(currentData?.[0]);
	}, [chats]);
	const isChatSelected = async (item: any) => {
		setSelectedChat(item);
	};
	return (
		<div className="mt-6">
			<div className=" ml-4 max-h-[60%] space-y-6 my-auto overflow-x-hidden overflow-y-scroll scrollbar-hide">
				{chats?.map((item: any) => {
					if (!item.isGroupChat) {
						const oppositeUser = item?.users?.find(
							(user: any) => user?._id !== id
						);
						return (
							<div
								key={item?._id}
								onClick={() => isChatSelected(item)}
								className={`flex items-center justify-between ${
									selectedChat?._id == item?._id
										? "bg-primary/30 rounded-r-2xl"
										: ""
								} p-2 rounded-xl cursor-pointer`}
							>
								<Image
									src={oppositeUser?.image}
									className={`rounded-full ${
										selectedChat?._id == item?._id
											? "border-4 border-primary"
											: ""
									}`}
									width={50}
									height={50}
									alt={oppositeUser?.name}
								/>
								<div className="flex flex-col items-start w-[70%]">
									<h3 className="font-semibold">{oppositeUser?.name}</h3>
									<p className="text-sm font-light truncate text-primary">
										{item?.latestmessage?.content}
									</p>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default FetchData;
