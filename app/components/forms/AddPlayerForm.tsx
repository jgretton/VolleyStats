"use client";

import React, { useState } from "react";
import { VOLLEYBALL_POSITIONS } from "@/types";

import { Player } from "@/store/types";
import { useClubStore } from "@/store";

const defaultPlayerObject = {
	name: "",
	position: "",
	number: undefined,
};

export const AddPlayerForm = ({
	teamId,
	onSave,
}: {
	teamId: string;
	onSave: () => void;
}) => {
	const [playerDetails, setPlayerDetails] =
		useState<Omit<Player, "id">>(defaultPlayerObject);

	const addPlayer = useClubStore((state) => state.addPlayerToTeam);

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

		addPlayer(teamId, playerDetails);
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
			</label>

			<button
				type="submit"
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
			>
				Add player
			</button>
		</form>
	);
};
