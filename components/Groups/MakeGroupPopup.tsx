import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

function MakeGroupPopup({ handlefunc, datas, ids }: any) {
	const { data: session } = useSession();
	const { email, name }: any = session?.user;
	const currentdata = datas.filter((item: any) => item.email == email);
	const [groupName, setGroupName] = useState("");
	const [searchResult, setSearchResult]: any = useState([]);
	const [selectedUser, setSelectedUser]: any = useState([]);

	const handleSearch = async (search: any) => {
		if (!search || search.trim() == "" || search.length < 3) {
			setSearchResult([]);
			return;
		} else {
			const result = await axios.get(
				`http://localhost:5000/chat/user?search=${search}`
			);
			setSearchResult(result.data);
		}
	};
	const handleUser = (userToAdd: any) => {
		if (
			selectedUser?.includes(userToAdd) ||
			userToAdd.email == selectedUser.filter((item: any) => item.email == email)
		) {
			alert("User Already Added");
			return;
		}
		setSelectedUser([...selectedUser, userToAdd]);
	};

	const handleDelete = (userToDelete: any) => {
		const result = selectedUser.filter(
			(item: any) => item._id !== userToDelete._id
		);
		setSelectedUser(result);
	};

	const handleSubmit = async () => {
		selectedUser.push(currentdata[0]);
		if (selectedUser.length < 2 || groupName.trim() == "") {
			alert("Please Add More User");
			return;
		}
		const result = await axios.post("http://localhost:5000/group", {
			name: groupName,
			users: JSON.stringify(selectedUser.map((u: any) => u._id)),
		});
		if (result.data) {
			handlefunc(false);
		}
	};

	return (
		<>
			<div className="h-auto w-full bg-light sm:w-[40%] pb-4 absolute z-50 backdrop-blur-sm right-0 left-0 mx-auto rounded-xl">
				<MdCancel
					onClick={() => handlefunc(false)}
					className="w-6 h-6 mt-6 ml-6 text-primary cursor-pointer"
				/>
				<div className="flex flex-col items-center justify-center space-y-6">
					<input
						type="text"
						className="w-[80%] p-2 rounded-xl pl-8 hover:outline-1 active:outline-1 hover:outline-primary outline-primary"
						placeholder="Name Of This New Group . . ."
						onChange={(e: any) => setGroupName(e.target.value)}
					/>
					<input
						type="text"
						className="w-[80%] p-2 rounded-xl pl-8 hover:outline-1 active:outline-1 hover:outline-primary outline-primary"
						placeholder="Add Your Contact . . . ."
						onChange={(e: any) => handleSearch(e.target.value)}
					/>
					<h4 className="text-xs font-light">
						( Please Enter More Than Two Character . . . )
					</h4>
					<div className="flex items-center w-[80%] mx-auto overflow-x-scroll scrollbar-hide">
						<h3 className="text-xs font-semibold mr-4">User Added : </h3>
						{selectedUser?.map((item: any) => (
							<div
								key={item._id}
								className="items-center bg-primary flex justify-between w-20 rounded-3xl p-1 text-xs"
							>
								<h3 className="text-white truncate w-[90%]">{item.name}</h3>
								<MdCancel
									className="text-white"
									onClick={() => handleDelete(item)}
								/>
							</div>
						))}
					</div>
					{searchResult && (
						<div className="w-[80%] h-[10rem] overflow-y-scroll space-y-4 scrollbar-hide">
							{searchResult?.map((items: any, id: any) => {
								if (
									(items.email == email && items.name == name) ||
									(selectedUser?.[id]?.email == items.email &&
										selectedUser?.[id]?.name == items.name)
								) {
									return;
								}
								return (
									<div
										key={items?._id}
										onClick={() => handleUser(items)}
										className="rounded-r-3xl rounded-l-full w-[80%] bg-white pr-4 mx-auto items-center flex justify-between"
									>
										<div className="rounded-full border-4 border-primary">
											<Image
												src={items?.image}
												className="rounded-full"
												width={50}
												height={50}
												alt="user_image"
											/>
										</div>
										<div className="text-right w-1/2">
											<h3 className="font-semibold text-lg">{items.name}</h3>
											<h3 className="font-thin text-xs">{items.email}</h3>
										</div>
									</div>
								);
							})}
						</div>
					)}
					<button
						onClick={() => handleSubmit()}
						disabled={!groupName || !selectedUser || selectedUser > 2}
						className="bg-primary disabled:bg-secondary disabled:cursor-not-allowed text-white py-2 rounded-2xl w-1/2 font-medium hover:bg-secondary"
					>
						Create Group
					</button>
				</div>
			</div>
		</>
	);
}

export default MakeGroupPopup;
