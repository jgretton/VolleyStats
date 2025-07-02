"use client";

import React, { useState } from "react";
import { VOLLEYBALL_POSITIONS } from "@/types";

import { Player } from "@/store/types";
import { useClubStore } from "@/store";

const defaultPlayerObject = {
	name: "",
	position: [],
	number: undefined,
	isActive: false,
};

export const AddPlayerForm = ({ onSave }: { onSave: () => void }) => {
	const [playerDetails, setPlayerDetails] =
		useState<Omit<Player, "id">>(defaultPlayerObject);
	const [teamId, setTeamId] = useState<string>("");

	const { club, addPlayer } = useClubStore();

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { value, name, type } = e.target;

		setPlayerDetails((prevState) => ({
			...prevState,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

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

		addPlayer(playerDetails, teamId);
		setPlayerDetails(defaultPlayerObject);
		onSave();
	};
	return (
		<form onSubmit={(e) => onFormSubmit(e)} className="grid gap-4">
			<label
				htmlFor="name"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Name:
				<div className="mt-2">
					<input
						type="text"
						name="name"
						id="name"
						placeholder="John Smith"
						value={playerDetails.name}
						onChange={(e) => handleOnChange(e)}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</label>
			<label
				htmlFor="number"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Number:
				<div className="mt-2">
					<input
						type="number"
						name="number"
						id="number"
						placeholder="1-99"
						min={1}
						max={99}
						value={playerDetails.number ?? ""}
						onChange={(e) => handleOnChange(e)}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</label>
			<label
				htmlFor="position"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Position:
				<div className="mt-2">
					<select
						name="position"
						id="position"
						value={playerDetails.position}
						onChange={(e) => handleOnChange(e)}
						className="col-start-1 row-start-1 w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					>
						<option value="">Select position...</option>
						{Object.entries(VOLLEYBALL_POSITIONS).map(([key, label]) => (
							<option key={key} value={key}>
								{label}{" "}
							</option>
						))}
					</select>
				</div>
				<span className="text-xs text-gray-500 font-light">
					You can select multiple
				</span>
			</label>
			{club.teams.length === 0 ? null : (
				<label
					htmlFor="position"
					className="block text-sm font-medium text-gray-900"
				>
					Team
					<br />
					<div className="mt-2">
						<select
							name="position"
							id="position"
							value={teamId}
							onChange={(e) => setTeamId(e.target.value)}
							className="col-start-1 row-start-1 w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						>
							<option value="">Select team...</option>
							{club.teams.map((team) => (
								<option key={team.id} value={team.id}>
									{team.name}
								</option>
							))}
						</select>
					</div>
					<span className="text-xs text-gray-500 font-light">
						This doesn&aspos;t have to be assigned right now.
					</span>
				</label>
			)}

			<button
				type="submit"
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
			>
				Add player
			</button>
		</form>
	);
};
