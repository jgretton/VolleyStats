"use client";

import React from "react";
import { useClubStore } from "@/store";
import Link from "next/link";
const TeamList = () => {
	const teams = useClubStore((state) => state.club.teams);
	const clubName = useClubStore((state) => state.club.name);
	const removeTeam = useClubStore((state) => state.removeTeam);

	const handleDelete = (teamId: string) => {
		removeTeam(teamId);
	};
	return (
		<div>
			<h2>{clubName} Teams</h2>
			{teams.length === 0 ? (
				<p>No teams created yet</p>
			) : (
				<ul>
					{teams.map((team) => (
						<li key={team.id} className="p-2 border-b">
							{team.name}

							<button
								className="mx-4 px-4 py-3 text-white bg-red-400 rounded-lg"
								onClick={() => handleDelete(team.id)}
							>
								Delete
							</button>
							<Link href={`/teams/${team.id}`}>View </Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TeamList;
