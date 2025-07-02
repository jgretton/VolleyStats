import React from "react";
import { Player } from "@/store/types";
import { ActiveTag } from "../ultils/activeTag";
import { useClubStore } from "@/store";

type PlayerWithTeams = Player & { teams: string[] };

const PlayerTable = ({ players }: { players: Player[] }) => {
	const { getPlayerTeams } = useClubStore();
	const playerWithTeams: PlayerWithTeams[] = players.map((player) => ({
		...player,
		teams: getPlayerTeams(player.id),
	}));
	return (
		<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Player Name
						</th>

						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Team/<span className="lowercase">s</span>
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{playerWithTeams.map((player: PlayerWithTeams) => {
						return (
							<tr
								key={player.id}
								className="hover:bg-gray-50 transition-colors duration-200"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900">
										{player.name}
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm font-medium text-gray-900">
										<ActiveTag isActive={player.isActive}>
											{player.isActive ? "Active" : "Inactive"}
										</ActiveTag>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-center">
									<div className="text-sm font-medium text-gray-900">
										{player.teams.map((team: string) => (
											<p key={team}>{team}</p>
										))}
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

export default PlayerTable;
