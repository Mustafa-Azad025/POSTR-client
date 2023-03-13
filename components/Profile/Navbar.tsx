import Image from "next/image";
import React from "react";
import Links from "../Header/Links";

function Navbar() {
	return (
		<div className="md:w-20 w-16 h-screen bg-light z-10">
			<div className="m-2 pt-5">
				<Image
					priority
					width={60}
					height={60}
					className="md:w-16 md:h-16 w-12 h-12"
					src="/logo.png"
					alt="social media app"
				/>
			</div>
			<Links />
		</div>
	);
}

export default Navbar;
