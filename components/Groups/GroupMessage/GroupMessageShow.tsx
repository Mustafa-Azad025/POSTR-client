import React, { useEffect } from "react";
import { useChat } from "../../../context/ChatManage";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getUser } from "../../../lib/getUser";

function GroupMessageShow() {
	const { groupSelect } = useChat();
	const [messages, setMessages]: any = useState([]);
	const { data: session } = useSession();
	const { email, name }: any = session?.user;
	const { isLoading, isError, data, error } = useQuery("users", getUser);
	const [open, setOpen] = useState(false);
	const [currMessageId, setCurrMessageId] = useState("");
	const cuser = data?.filter((item: any) => {
		if (item.name == name && item.email == email) {
			return item;
		}
	});
	const cuserId = cuser?.[0]?._id;
	const fetchMessage = async () => {
		try {
			const { data } = await axios.post(
				`https://postr-server.vercel.app/api/recievemsg/`,
				{
					chatId: [groupSelect]?.[0]?._id,
				}
			);
			setMessages(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchMessage();
	}, [groupSelect, messages]);

	const checkLastMessage = (i: any) => {
		return (
			i === messages?.length - 1 &&
			messages?.[messages?.length - 1]?.sender?._id !== cuserId &&
			messages?.[messages.length - 1]?.sender?._id
		);
	};

	const deleteMessage = async (messageId: string, sennderId: string) => {
		if (sennderId === cuserId) {
			try {
				await axios.post(
					`https://postr-server.vercel.app/api/deleteMessages/`,
					{
						messageId: messageId,
					}
				);
			} catch (error) {
				alert("some error occur to delete");
			}
		}
	};
	const currMessage = (currId: string, senderId: string) => {
		if (cuserId == senderId) {
			setOpen(true);
			setCurrMessageId(currId);
		}
	};
	const notCurrMessage = (currId: string, senderId: string) => {
		if (cuserId == senderId) {
			setOpen(false);
			setCurrMessageId("");
		}
	};

	return (
		<>
			{[groupSelect][0]._id && (
				<div className="absolute left-[15%] top-10 sm:left-[10%] md:left-[25rem] h-[80vh] overflow-y-scroll overflow-x-hidden sm:right-[2%] right-[1%] z-[5] max-w-[35rem] xl:max-w-3xl w-[-webkit-fill-available] mx-auto bg-light rounded-t-3xl">
					{[groupSelect]?.map((item: any) => {
						return (
							<div
								key={item?._id}
								className="bg-white p-2 rounded-2xl shadow-md w-[-webkit-fill-available]  text-gray-400 justify-center font-medium "
							>
								<div className="flex items-center sm:space-x-32 space-x-20">
									<div className="flex flex-col ml-3 max-w-[15rem] sm:max-w-full">
										<h3 className="font-semibold text-xl">{item?.chatName}</h3>
										<div className="flex items-center truncate w-full overflow-hidden">
											{item?.users?.map((itemss: any) => {
												return (
													<p
														key={itemss?._id}
														className="text-xs font-thin text-primary"
													>
														{itemss?.name},
													</p>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						);
					})}
					<div className="bg-white p-2 mt-2 rounded-2xl shadow-md w-[-webkit-fill-available] text-gray-400 overflow-y-scroll overflow-x-hidden scrollbar-hide justify-center font-medium h-[70vh] ">
						<ScrollableFeed>
							{messages &&
								messages?.map((item: any, id: any) => {
									return (
										<div
											onClick={() => currMessage(item?._id, item?.sender?._id)}
											onMouseLeave={() =>
												notCurrMessage(item?._id, item?.sender?._id)
											}
											key={item?._id}
											className={`flex items-center my-2 space-x-3 w-full h-auto ${
												cuserId != item?.sender?._id
													? "justify-start"
													: "justify-end ml-[61%]"
											}}`}
										>
											{checkLastMessage(id) && (
												<Image
													src={item?.sender?.image}
													width={40}
													loading="lazy"
													className="rounded-full"
													height={40}
													alt={item?.sender?.name}
												/>
											)}
											<div
												className={`p-2 flex space-y-2 space-x-2 rounded-2xl lg:w-[25%] sm:w-[20%] lg:max-w-[50%] max-w-[40%] ${
													cuserId != item?.sender?._id
														? "bg-light items-start text-left justify-start"
														: "bg-secondary text-right items-end justify-end"
												}`}
											>
												<div
													className={`flex flex-col ${
														cuserId != item?.sender?._id
															? "items-start"
															: "items-end"
													}`}
												>
													<p className="text-xs text-primary font-medium w-full">
														{item?.sender?.name}
													</p>
													<p className="text-sm font-semibold  w-full">
														{item?.content}
													</p>
													<time
														className={`text-[0.5rem] flex space-x-1 font-light mt-1  ${
															cuserId != item?.sender?._id
																? "items-start"
																: "items-end"
														}`}
													>
														<p>{moment(item?.createdAt).format("dddd")}</p>
														<p>{moment(item?.createdAt).format("LT")}</p>
													</time>
												</div>
												{cuserId == item?.sender?._id &&
													open &&
													item?._id == currMessageId && (
														<div
															className="flex items-center cursor-pointer bg-white rounded-full p-1"
															onClick={() =>
																deleteMessage(item?._id, item?.sender?._id)
															}
														>
															<MdDeleteOutline className="w-5 h-5 text-warn" />
														</div>
													)}
											</div>
										</div>
									);
								})}
						</ScrollableFeed>
					</div>
				</div>
			)}
		</>
	);
}

export default GroupMessageShow;
