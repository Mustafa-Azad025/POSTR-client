import React from "react";
import { useEffect } from "react";
import { useChat } from "./../../context/ChatManage";
import axios from "axios";

function FetchGroup() {
	const { currentUser, chats, setGroupSelect, groupSelect, setChats } =
		useChat();
	const currentUserId = [currentUser][0]?._id;
	const datas = async () => {
		const data = await axios.post(`http://localhost:5000/api/messagefetch/`, {
			id: currentUserId,
		});
		setChats(data?.data);
	};
	useEffect(() => {
		datas();
	}, []);

	const isChatSelected = async (item: any) => {
		setGroupSelect(item);
	};
	return (
		<div className="mt-6">
			<div className=" ml-4 max-h-[60%] space-y-6 my-auto overflow-x-hidden overflow-y-scroll scrollbar-hide">
				{chats?.map((item: any) => {
					if (item.isGroupChat) {
						return (
							<div
								key={item?._id}
								onClick={() => isChatSelected(item)}
								className={`flex items-center justify-between ${
									groupSelect?._id == item?._id
										? "bg-primary/30 rounded-r-2xl"
										: ""
								} p-2 rounded-xl cursor-pointer`}
							>
								<div className="flex flex-col items-start w-[70%]">
									<h3 className="font-semibold text-xl">{item?.chatName}</h3>
									<div className="flex items-center truncate w-full overflow-hidden">
										<p className="text-xs font-thin text-primary">
											{item?.latestmessage?.content}
										</p>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default FetchGroup;
