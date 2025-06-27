"use client";

import React from "react";
import { useClubStore } from "@/store";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../modal/AppModal";

const PlayerList = ({ teamId }: { teamId: string }) => {
	const {
		isOpen,
		modalType,
		modalData,
		closeModal,
		openEditPlayer,
		openAddPlayer,
	} = useAppModal();

	const players = useClubStore((state) => state.getPlayersByTeamId(teamId));
	const removePlayer = useClubStore((state) => state.removePlayerFromTeam);

	const handleDelete = (teamId: string, playerId: string) => {
		removePlayer(teamId, playerId);
	};

	return (
		<div className=" p-4">
			<button
				className="px-4 py-2  text-white bg-blue-500 rounded-md  cursor-pointer"
				onClick={() => openAddPlayer(teamId)}
			>
				+ Add Player
			</button>
			<table className="w-full table table-auto border-spacing-y-2 border-separate mt-10">
				<thead>
					<tr className="border-b-2">
						<th className="border-b-2 border-gray-200 pb-2">Player Name</th>
						<th className="border-b-2 border-gray-200 pb-2">Number</th>
						<th className="border-b-2 border-gray-200 pb-2">Position</th>
						<th className="border-b-2 border-gray-200 pb-2">Quick action</th>
					</tr>
				</thead>
				<tbody className="w-full ">
					{players.length === 0 ? (
						<tr className="w-full">
							<td colSpan={4} className="w-full text-center">
								<p className="mt-10 text-xl font-bold">
									There are no players added.
								</p>
								<button
									className="px-4 py-2 rounde-md text-white bg-blue-500 rounded-md mt-10 cursor-pointer"
									onClick={() => openAddPlayer(teamId)}
								>
									+ Add Player
								</button>
							</td>
						</tr>
					) : (
						players.map((player) => (
							<tr key={player.id} className="text-center even:bg-gray-100">
								<td className="">
									<p>{player.name}</p>
								</td>
								<td className="">
									<p>{player.number}</p>
								</td>
								<td>
									<p>{player.position}</p>
								</td>
								<td className="flex gap-3 items-center justify-center py-2">
									<button
										className="px-4 py-2 text-white bg-red-400 rounded-lg cursor-pointer"
										onClick={() => handleDelete(teamId, player.id)}
									>
										Delete
									</button>
									<button
										className="px-4 py-2 text-white bg-blue-400 rounded-lg cursor-pointer"
										onClick={() => {
											openEditPlayer(player, teamId);
										}}
									>
										Edit
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<AppModal
				closeModal={closeModal}
				isOpen={isOpen}
				modalType={modalType}
				modalData={modalData}
			/>
		</div>
	);
};

export default PlayerList;
