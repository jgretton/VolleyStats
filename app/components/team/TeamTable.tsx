import { Team } from "@/store/types";
import React from "react";
import { AppModal } from "../modal/AppModal";
import { useAppModal } from "@/hooks/useAppModal";
import { useClubStore } from "@/store";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type updatedTeamData = Team & { totalPlayers: number; totalMatches: number };

const TeamTable = ({ teams }: { teams: Team[] }) => {
	const { isOpen, modalData, modalType, closeModal } = useAppModal();

	const { calculatePlayersPerTeam, calculateMatchesPerTeam } = useClubStore();

	const updatedTeamData: updatedTeamData[] = teams.map((team: Team) => ({
		...team,
		totalPlayers: calculatePlayersPerTeam(team.id),
		totalMatches: calculateMatchesPerTeam(team.id),
	}));

	return (
		<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Team Name
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total Matches
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total Players
						</th>
						<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{updatedTeamData.map((team) => {
						// const totalMatches = calculateMatchesPerSeason(season.id);
						// const totalPlayers = calculatePlayersPerSeason(season.id);
						// const isCurrentSeason = season.id === club.currentSeasonId;

						return (
							<tr
								key={team.id}
								className="hover:bg-gray-50 transition-colors duration-200"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{team.name}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm text-gray-700">
										{team.totalMatches > 0 ? (
											team.totalMatches
										) : (
											<span className="text-gray-400">No matches</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm text-gray-700">
										{team.totalPlayers > 0 ? (
											team.totalPlayers
										) : (
											<span className="text-gray-400">No players</span>
										)}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex items-center justify-end gap-2">
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

			<AppModal
				isOpen={isOpen}
				modalData={modalData}
				modalType={modalType}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default TeamTable;
