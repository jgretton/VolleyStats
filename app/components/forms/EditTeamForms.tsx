import { useClubStore } from "@/store";
import { Team } from "@/store/types";
import React, { useState } from "react";

export const EditTeamForms = ({
	onSave,
	team,
}: {
	onSave: () => void;
	team: Team;
}) => {
	const [updatedTeam, setUpdatedTeam] = useState<string>(team.name);
	const updateTeamName = useClubStore((state) => state.updateTeam);
	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		updateTeamName(team.id, updatedTeam);
		onSave();
	};
	return (
		<form onSubmit={(e) => handleUpdate(e)}>
			<label>
				Team Name:
				<input
					type="text"
					value={updatedTeam}
					onChange={(e) => setUpdatedTeam(e.target.value)}
					placeholder="Enter team name"
					className="rounded-md border p-3 border-gray-500 ml-5"
				/>
			</label>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded-md ml-3"
			>
				Update
			</button>
		</form>
	);
};
