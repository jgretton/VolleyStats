"use client";

import {
	ClipboardDocumentListIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useClubStore } from "@/store";

const LINKS = [
	{
		title: "Home",
		href: "/",
		icon: HomeIcon,
	},
	{
		title: "Team Management",
		href: "/teams",
		icon: ClipboardDocumentListIcon,
	},
];

export const AppSidebar = () => {
	const pathName = usePathname();
	const clubName = useClubStore((state) => state.club);

	return (
		<div className="min-h-screen h-full border-r border-gray-100 px-4">
			<div className="mt-10">
				<Link className="hover:underline font-semibold text-lg" href="/">
					{clubName.name} Stats
				</Link>

				<div className="mt-20 w-full">
					<ul className="flex flex-col gap-3 mt-2">
						{LINKS.map((link, idx) => (
							<li
								className={`mt-1  block w-full text-gray-400 hover:text-gray-950 ${
									pathName === link.href && "text-gray-950"
								}`}
								key={idx}
							>
								<Link
									href={link.href}
									className="font-bold  inline-flex items-center gap-3 w-full "
								>
									<span>
										<link.icon className="size-6" />
									</span>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
