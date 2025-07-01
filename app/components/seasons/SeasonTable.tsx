"use client";

import { useClubStore } from "@/store";
import { Season } from "@/store/types";
import React from "react";
import { ActiveTag } from "./activeTag";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const SeasonTable = ({ seasonData }: { seasonData: Season[] }) => {
	const { calculateMatchesPerSeason, calculatePlayersPerSeason, club } =
		useClubStore((state) => state);

	if (seasonData.length === 0) {
		return (
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
				<p className="text-gray-500 font-medium">No seasons found</p>
				<p className="text-gray-400 text-sm mt-1">
					Create your first season to get started.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Season Name
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total Matches
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total Players
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{seasonData.map((season) => {
						const totalMatches = calculateMatchesPerSeason(season.id);
						const totalPlayers = calculatePlayersPerSeason(season.id);
						const isCurrentSeason = season.id === club.currentSeasonId;

						return (
							<tr
								key={season.id}
								className={`hover:bg-gray-50 transition-colors duration-200 ${
									isCurrentSeason
										? "bg-blue-50 border-l-4 border-l-blue-500"
										: ""
								}`}
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{season.name}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm text-gray-700">
										{totalMatches > 0 ? (
											totalMatches
										) : (
											<span className="text-gray-400">No matches</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm text-gray-700">
										{totalPlayers > 0 ? (
											totalPlayers
										) : (
											<span className="text-gray-400">No players</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<ActiveTag isActive={isCurrentSeason} />
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex items-center justify-end gap-2">
										{!isCurrentSeason && (
											<button
												className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
												onClick={() => {
													/* Set as current */
												}}
											>
												Set Current
											</button>
										)}
										<button
											className="text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
											onClick={() => {
												/* Edit season */
											}}
										>
											<PencilIcon className="size-5" />
										</button>
										<button
											className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
											onClick={() => {
												/* Delete season */
											}}
										>
											<TrashIcon className="size-5" />
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
