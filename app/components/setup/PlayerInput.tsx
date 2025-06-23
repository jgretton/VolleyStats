"use client";

import React, { useState } from "react";
import { VOLLEYBALL_POSITIONS, VolleyballPosition } from "@/types";

import { Player } from "@/store/types";
import { useClubStore } from "@/store";

const defaultPlayerObject = {
	name: "",
	position: "",
	number: undefined,
};

export const PlayerInput = ({ teamId }: { teamId: string }) => {
	const [playerDetails, setPlayerDetails] =
		useState<Omit<Player, "id">>(defaultPlayerObject);

	const addPlayer = useClubStore((state) => state.addPlayerToTeam);
	const getPlayers = useClubStore((state) => state.getPlayersByTeamId);

	const players = getPlayers(teamId);

	const onFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!playerDetails.name ||
			!playerDetails.number ||
			!playerDetails.position
		) {
			console.log("Missing required fields");
			return;
		}

		addPlayer(teamId, playerDetails);
		setPlayerDetails(defaultPlayerObject);
	};

	return (
		<div className="">
			<form onSubmit={onFormSubmit}>
				<input
					type="text"
					value={playerDetails.name ?? ""}
					onChange={(e) =>
						setPlayerDetails((prevState) => ({
							...prevState,
							name: e.target.value,
						}))
					}
					name="name"
					className=" rounded-md border p-3 border-gray-500"
				/>
				<input
					type="number"
					value={playerDetails.number ?? ""}
					min={1}
					max={99}
					onChange={(e) =>
						setPlayerDetails((prevState) => ({
							...prevState,
							number: e.target.value === "" ? 0 : parseInt(e.target.value, 10),
						}))
					}
					name="number"
					className=" rounded-md border p-3 border-gray-500"
				/>

				<select
					className="ml-3"
					name="position"
					value={playerDetails.position ?? ""}
					onChange={(e) =>
						setPlayerDetails((prevState) => ({
							...prevState,
							position: e.target.value as VolleyballPosition,
						}))
					}
				>
					<option value="">Select position...</option>
					{Object.entries(VOLLEYBALL_POSITIONS).map(([key, label]) => (
						<option key={key} value={key}>
							{label}{" "}
						</option>
					))}
				</select>

				<button
					type="submit"
					className="bg-gray-400 text-black px-4 py-2 rounded-md ml-3 cursor-pointer"
				>
					Add
				</button>
			</form>

			<div className="mt-10">
				{players.length === 0 ? (
					<div>No players</div>
				) : (
					players.map((player) => (
						<p key={player.id}>
							{player.name} : {player.number} : {player.position}
						</p>
					))
				)}
			</div>
		</div>
	);
};
