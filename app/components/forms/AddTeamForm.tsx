"use client";
import { useClubStore } from "@/store";
import { useState } from "react";

export const AddTeamForm = ({ onSave }: { onSave: () => void }) => {
	const addTeam = useClubStore((state) => state.addTeam);
	const [teamName, setTeamName] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!teamName.trim()) {
			console.log("Team name required");
			return;
		}
		addTeam(teamName.trim());
		setTeamName("");
		onSave();
	};

	return (
		<form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
			<label
				htmlFor="teamName"
				className="block text-sm/6 font-medium text-gray-900"
			>
				Team Name:
				<div className="mt-2">
					<input
						type="text"
						name="teamName"
						id="teamName"
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
						placeholder="Enter team name"
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
				</div>
			</label>
			<button
				type="submit"
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
			>
				Add Team
			</button>
		</form>
	);
};
