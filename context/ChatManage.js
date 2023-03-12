import { createContext, useContext, useState } from "react";

const Contextchat = createContext();

const ChatProvide = ({ children }) => {
	const [selectedChat, setSelectedChat] = useState([]);
	const [chats, setChats] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);
	const [groupSelect, setGroupSelect] = useState([]);
	const [messages, setMessages] = useState([]);
	const [sendMessageData, setSendMessageData] = useState([]);

	return (
		<Contextchat.Provider
			value={{
				selectedChat,
				setSelectedChat,
				chats,
				setChats,
				currentUser,
				setCurrentUser,
				groupSelect,
				setGroupSelect,
				messages,
				setMessages,
				sendMessageData,
				setSendMessageData,
			}}
		>
			{children}
		</Contextchat.Provider>
	);
};

export const useChat = () => {
	return useContext(Contextchat);
};

export default ChatProvide;
