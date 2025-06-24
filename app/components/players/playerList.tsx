"use client";

import React, { useState } from "react";
import { useClubStore } from "@/store";
import Modal from "../modal/Modal";
import { Player } from "@/store/types";
import { VOLLEYBALL_POSITIONS } from "@/types";
const PlayerList = ({ teamId }: { teamId: string }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedPlayer, setSelectedPlayer] = useState<Omit<Player, "id">>({
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
							View
						</button>
					</div>
				))
			)}

			<Modal
				title="Edit player"
				isModalOpen={isModalOpen}
				closeModal={closeModal}
			>
				<form className="grid gap-4">
					<label className="block text-sm/6 font-medium text-gray-900">
						Name:
						<div className="mt-2">
							<input
								type="text"
								name="name"
								id="name"
								value={selectedPlayer.name}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</label>
					<label className="block text-sm/6 font-medium text-gray-900">
						Number:
						<div className="mt-2">
							<input
								type="number"
								name="number"
								id="number"
								value={selectedPlayer.number}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
					</label>
					<label className="block text-sm/6 font-medium text-gray-900">
						Position:
						<div className="mt-2">
							<select
								name="position"
								id="position"
								value={selectedPlayer.position}
								className="col-start-1 row-start-1 w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							>
								{Object.entries(VOLLEYBALL_POSITIONS).map(([key, label]) => (
									<option key={key} value={key}>
										{label}{" "}
									</option>
								))}
							</select>
						</div>
					</label>
				</form>
			</Modal>
		</div>
	);
};

export default PlayerList;
