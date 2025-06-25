"use client";

import { VOLLEYBALL_POSITIONS } from "@/types";
import { Player } from "@/store/types";
import React, { useEffect, useState } from "react";
import { useClubStore } from "@/store";

const EditPlayerForm = ({
	player,
	teamId,
	onSave,
}: {
	player: Player;
	teamId: string;
	onSave: () => void;
}) => {
	const handleUpdatePlayer = useClubStore((state) => state.updatePlayer);
	const [updatedPlayer, setUpdatedPlayer] = useState<Player>({
		name: "",
		position: "",
		id: "",
		number: 0,
	});

	useEffect(() => {
		if (!player) {
			return;
		} else setUpdatedPlayer(player);
	}, [player]);

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { value, name, type } = e.target;

		setUpdatedPlayer((prevState) => ({
			...prevState,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		handleUpdatePlayer(teamId, updatedPlayer);
		onSave();
	};

	return (
		<form className="grid gap-4" onSubmit={(e) => handleSave(e)}>
			<label className="block text-sm/6 font-medium text-gray-900">
				Name:
				<div className="mt-2">
					<input
						type="text"
						name="name"
						id="name"
						value={updatedPlayer.name}
						onChange={(e) => handleOnChange(e)}
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
						min={1}
						max={99}
						value={updatedPlayer.number}
						onChange={(e) => handleOnChange(e)}
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
						value={updatedPlayer.position}
						onChange={(e) => handleOnChange(e)}
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

			<button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
				Save
			</button>
		</form>
	);
};

export default EditPlayerForm;
