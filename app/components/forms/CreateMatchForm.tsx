"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ultils/button";
import { Match, Team } from "@/store/types";
import { useClubStore } from "@/store";
import Select, { MultiValue } from "react-select";

const default_match: Omit<Match, "id" | "seasonId"> = {
	teamId: "",
	opponent: "",
	date: "",
	selectedPlayers: [],
	status: "upcoming",
};

type PlayerSelection = {
	label: string;
	value: string;
};

const CreateMatchForm = ({ onSave }: { onSave: () => void }) => {
	const [formData, setFormData] =
		useState<Omit<Match, "id" | "seasonId">>(default_match);
	const [playerSelection, setPlayerSelection] = useState<PlayerSelection[]>([]);

	const { club, getActivePlayersByTeamId } = useClubStore();
	const { teams } = club;

	//if team has not been selected - cannt select players
	//once team selected - show players for that team.
	useEffect(() => {
		if (formData.teamId.trim() === "") {
			console.log("need to pick a team");
		} else {
			//find players for that team, put them into playerSelection.
			const teamPlayers = getActivePlayersByTeamId(formData.teamId);
			const playerOptions = teamPlayers.map((player) => ({
				label: player.name,
				value: player.id,
			}));
			setPlayerSelection(playerOptions);
			setFormData((prevState) => ({ ...prevState, selectedPlayers: [] }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData.teamId]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onSave();
	};

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { value, name } = e.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePlayerSelection = (
		selectedOptions: MultiValue<PlayerSelection>
	) => {
		const playerIds = selectedOptions
			? selectedOptions.map((option) => option.value)
			: [];

		setFormData((prevState) => ({
			...prevState,
			selectedPlayers: playerIds,
		}));
	};

	return (
		<form
			onSubmit={(e: React.FormEvent) => handleSubmit(e)}
			className="grid gap-4"
		>
			<label
				htmlFor="teamId"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Your Team
				<div className="mt-2">
					<select
						name="teamId"
						id="teamId"
						value={formData.teamId}
						onChange={(e) => handleOnChange(e)}
						className="col-start-1 row-start-1 w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					>
						<option value="">Select Team...</option>
						{teams.map((team: Team) => (
							<option key={team.id} value={team.id}>
								{team.name}
							</option>
						))}
					</select>
				</div>
			</label>

			<label
				htmlFor="opponent"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Opponent
				<div className="mt-2">
					<input
						type="text"
						name="opponent"
						id="opponent"
						placeholder="Nottingham Rockets"
						value={formData.opponent}
						onChange={(e) => handleOnChange(e)}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</label>

			<label
				htmlFor="date"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Match Date
				<div className="mt-2">
					<input
						type="date"
						name="date"
						id="date"
						value={formData.date}
						onChange={(e) => handleOnChange(e)}
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</label>
			<label
				htmlFor="selectedPlayers"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Match Squad
				<div className="mt-2">
					{playerSelection.length < 1 || formData.teamId === "" ? (
						<p className="text-xs/3 text-gray-500">
							Please select a team before selecting your squad
						</p>
					) : (
						<Select
							name="selectedPlayers"
							id="selectedPlayers"
							isMulti
							hideSelectedOptions
							controlShouldRenderValue={false}
							placeholder="Search players..."
							onChange={handlePlayerSelection}
							options={playerSelection}
							value={playerSelection.filter((option) =>
								formData.selectedPlayers.includes(option.value)
							)}
						/>
					)}
				</div>
			</label>
			<div className="">
				{formData.selectedPlayers.length < 1 ? (
					<p>Select your match squad</p>
				) : (
					formData.selectedPlayers.map((playerId) => {
						// Find the player name from the options
						const playerOption: PlayerSelection | undefined =
							playerSelection.find(
								(p: PlayerSelection) => p.value === playerId
							);
						return (
							<div
								key={playerId}
								className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1"
							>
								<span className="text-base text-gray-800">
									{playerOption?.label}
								</span>
								<Button
									type="button"
									className="text-red-500"
									icon={false}
									size="sm"
									variant="delete"
									onClick={() =>
										setFormData((prevState) => {
											const newSelectedPlayers =
												prevState.selectedPlayers.filter(
													(id) => id !== playerId
												);
											return {
												...prevState,
												selectedPlayers: newSelectedPlayers,
											};
										})
									}
								>
									Remove
								</Button>
							</div>
						);
					})
				)}
			</div>
			<Button type="submit" icon={false} className="w-full justify-center">
				Create Match
			</Button>
		</form>
	);
};

export default CreateMatchForm;
