"use client";

import React, { useState } from "react";
import { useClubStore } from "@/store";
import Modal from "../modal/Modal";
import { Player } from "@/store/types";
import EditPlayerForm from "./EditPlayerForm";

const PlayerList = ({ teamId }: { teamId: string }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedPlayer, setSelectedPlayer] = useState<Player>({
		id: "",
		name: "",
		number: undefined,
		position: "",
	});

	const players = useClubStore((state) => state.getPlayersByTeamId(teamId));
	const removePlayer = useClubStore((state) => state.removePlayerFromTeam);

	const handleDelete = (teamId: string, playerId: string) => {
		removePlayer(teamId, playerId);
	};
	const closeModal = () => {
		setIsModalOpen(false);
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
								setIsModalOpen(true);
								setSelectedPlayer(player);
							}}
						>
							Edit
						</button>
					</div>
				))
			)}

			<Modal
				title="Edit player"
				isModalOpen={isModalOpen}
				closeModal={closeModal}
			>
				<EditPlayerForm
					selectedPlayer={selectedPlayer}
					teamId={teamId}
					closeModal={closeModal}
				/>
			</Modal>
		</div>
	);
};

export default PlayerList;
