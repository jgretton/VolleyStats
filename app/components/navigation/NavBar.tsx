import Link from "next/link";
import React from "react";

const NavBar = () => {
	return (
		<header className="w-screen h-auto border-b-2 border-gray-200">
			<div className="max-w-7xl mx-auto p-5 flex flex-row items-center gap-10">
				<Link className="hover:underline font-semibold text-lg" href="/">
					Stats
				</Link>
				<div className="flex-1">
					<ul>
						<li>
							<Link className="hover:underline" href="/teams">
								Teams
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default NavBar;
