"use client";

import React from "react";
import { useClubStore } from "@/store";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../modal/AppModal";

const PlayerList = ({ teamId }: { teamId: string }) => {
	const { isOpen, modalType, modalData, closeModal, openEditPlayer } =
		useAppModal();

	const players = useClubStore((state) => state.getPlayersByTeamId(teamId));
	const removePlayer = useClubStore((state) => state.removePlayerFromTeam);

	const handleDelete = (teamId: string, playerId: string) => {
		removePlayer(teamId, playerId);
	};

	return (
		<div className="mt-10 p-4">
			{players.length === 0 ? (
				<div>No players</div>
			) : (
				players.map((player) => (
					<div className="flex gap-4 items-center mb-4" key={player.id}>
						<p>
							{player.name} : {player.number} : {player.position}
						</p>
						<button
							className="mx-4 px-4 py-3 text-white bg-red-400 rounded-lg cursor-pointer"
							onClick={() => handleDelete(teamId, player.id)}
						>
							Delete
						</button>
						<button
							className="mx-4 px-4 py-3 text-white bg-blue-400 rounded-lg cursor-pointer"
							onClick={() => {
								openEditPlayer(player, teamId);
							}}
						>
							Edit
						</button>
					</div>
				))
			)}
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
