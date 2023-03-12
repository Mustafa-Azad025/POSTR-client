import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";

function Menu(ids: any) {
	const handlesignout = () => {
		signOut();
	};
	return (
		<div className="absolute bottom-16 left-0 max-w-[21rem] sm:max-w-sm z-50 w-full rounded-r-3xl p-1 items-center select-none">
			<Link href={`/profile/${[ids]?.[0]?.ids}`}>
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
	);
}

export default Menu;
