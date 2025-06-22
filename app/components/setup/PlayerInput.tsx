"use client";

import React, { useState } from "react";
import { Player, VOLLEYBALL_POSITIONS, VolleyballPosition } from "@/types";

export const PlayerInput = () => {
	const [playerList, setPlayerList] = useState<Player[]>([]);
	const [playerDetails, setPlayerDetails] = useState<Partial<Player>>({});

	const onFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!playerDetails?.name ||
			!playerDetails?.number ||
			!playerDetails?.position
		) {
			console.log("Missing required fields");
			return;
		}

		const newPlayer: Player = {
			id: crypto.randomUUID(),
			name: playerDetails.name!,
			number: playerDetails.number!,
			position: playerDetails.position,
		};

		setPlayerList((prevState) => {
			return [...prevState, newPlayer];
		});

		console.log(newPlayer);
		setPlayerDetails({});
	};

	return (
		<div className="">
			<form onSubmit={onFormSubmit}>
				<input
					type="text"
					value={playerDetails?.name ?? ""}
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
					value={playerDetails?.number ?? ""}
					onChange={(e) =>
						setPlayerDetails((prevState) => ({
							...prevState,
							number:
								e.target.value === ""
									? undefined
									: parseInt(e.target.value, 10),
						}))
					}
					name="number"
					className=" rounded-md border p-3 border-gray-500"
				/>

				<select
					className="ml-3"
					name="position"
					value={playerDetails?.position ?? ""}
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

			<ul>
				{playerList.map((player) => (
					<li key={player.id}>
						{player.name} : {player.number} : {player.position}
					</li>
				))}
			</ul>
		</div>
	);
};
