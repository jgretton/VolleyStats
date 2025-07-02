"use client";

import {
	HomeIcon,
	CalendarDaysIcon,
	UserGroupIcon,
	ChartBarIcon,
	UsersIcon,
	CalendarIcon,
	BuildingOfficeIcon,
	CogIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useClubStore } from "@/store";

const MAIN_LINKS = [
	{
		title: "Dashboard",
		href: "/",
		icon: HomeIcon,
	},
	{
		title: "Matches",
		href: "/matches",
		icon: CalendarDaysIcon,
	},
	{
		title: "Teams",
		href: "/teams",
		icon: UserGroupIcon,
	},
	{
		title: "Stats",
		href: "/stats",
		icon: ChartBarIcon,
	},
];

const ADMIN_LINKS = [
	{
		title: "Seasons",
		href: "/admin/seasons",
		icon: CalendarIcon,
	},
	{
		title: "Players",
		href: "/admin/players",
		icon: UsersIcon,
	},
	{
		title: "Team Management",
		href: "/admin/team-management",
		icon: BuildingOfficeIcon,
	},
	{
		title: "Settings",
		href: "/admin/settings",
		icon: CogIcon,
	},
];

export const AppSidebar = () => {
	const pathName = usePathname();
	const clubName = useClubStore((state) => state.club);

	return (
		<div className="min-h-screen h-full border-r border-gray-200 bg-gray-50 px-4 min-w-fit">
			<div className="pt-8">
				<Link
					className="hover:underline font-bold text-xl text-gray-900 block mb-12"
					href="/"
				>
					{clubName.name}
					<span className="block text-sm font-normal text-gray-600 mt-1">
						Stats Dashboard
					</span>
				</Link>

				<nav className="space-y-1">
					{MAIN_LINKS.map((link) => {
						const isActive = pathName === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
									isActive
										? "bg-blue-100 text-blue-700 shadow-sm"
										: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
								}`}
							>
								<link.icon
									className={`h-5 w-5 ${
										isActive
											? "text-blue-600"
											: "text-gray-500 group-hover:text-gray-700"
									}`}
								/>
								{link.title}
							</Link>
						);
					})}

					<div className="mt-8 pt-6 border-t border-gray-200">
						<h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
							Admin
						</h3>

						<div className="space-y-1">
							{ADMIN_LINKS.map((link) => {
								const isActive = pathName === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
											isActive
												? "bg-blue-100 text-blue-700 shadow-sm"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
										}`}
									>
										<link.icon
											className={`h-4 w-4 ${
												isActive
													? "text-blue-600"
													: "text-gray-500 group-hover:text-gray-700"
											}`}
										/>
										{link.title}
									</Link>
								);
							})}
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
