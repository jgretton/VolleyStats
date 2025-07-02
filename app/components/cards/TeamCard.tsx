import { useClubStore } from "@/store";
import { Team } from "@/store/types";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export const TeamCard = ({ team }: { team: Team }) => {
	const { calculatePlayersPerTeam } = useClubStore();
	const playerTotal = calculatePlayersPerTeam(team.id);
	return (
		<Link href={`/teams/${team.id}`}>
			<div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer group">
				{/* Header */}
				<div className="p-6 pb-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
							{team.name}
						</h3>
						<div className="flex items-center gap-1 text-gray-500">
							<UserGroupIcon className="h-4 w-4" />
							<span className="text-sm font-medium">{playerTotal}</span>
						</div>
					</div>
				</div>

				{/* Footer Action Hint */}
				<div className="px-6 py-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
					<div className="flex items-center justify-between">
						<span className="text-xs text-gray-500">Click to manage team</span>
						<svg
							className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Link>
	);
};
