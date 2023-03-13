import axios from "axios";
import Image from "next/image";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useChat } from "./../../context/ChatManage";

function ChatAccess({ ids, currentid, name, email, img }: any) {
	const { setChats, chats } = useChat();
	const accessData = async () => {
		try {
			const { data } = await axios.post(
				`https://postr-server.vercel.app/api/message/`,
				{
					id: ids,
					currentuser: currentid,
				}
			);
			if (
				chats?.filter((item: any) => item?.email == email && item?.name == name)
			) {
				return;
			}
			setChats([data, ...chats]);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div
				onClick={() => accessData()}
				className="flex justify-between items-center cursor-pointer border-b border-mid/50 py-2"
			>
				<div>
					<Image
						priority
						className="rounded-full"
						src={img}
						width={50}
						height={50}
						alt={name}
					/>
				</div>
				<h3 className="font-medium">{name}</h3>
				<AiOutlineRight />
			</div>
		</>
	);
}

export default ChatAccess;
