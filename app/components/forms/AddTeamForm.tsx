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
		<form onSubmit={(e) => handleSubmit(e)}>
			<label>
				Team Name:
				<input
					type="text"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
					placeholder="Enter team name"
					className="rounded-md border p-3 border-gray-500 ml-5"
				/>
			</label>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded-md ml-3"
			>
				Add Team
			</button>
		</form>
	);
};
