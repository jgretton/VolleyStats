"use client";

import React from "react";
import { useClubStore } from "@/store";
import Link from "next/link";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../modal/AppModal";
const TeamList = () => {
	const { isOpen, modalData, modalType, closeModal, openEditTeam } =
		useAppModal();
	const teams = useClubStore((state) => state.club.teams);
	const clubName = useClubStore((state) => state.club.name);
	const removeTeam = useClubStore((state) => state.removeTeam);

	const handleDelete = (teamId: string) => {
		removeTeam(teamId);
	};

	if (!teams) {
		return <div>No Teams</div>;
	} else
		return (
			<div>
				<h2>{clubName} Teams</h2>
				{teams?.length === 0 ? (
					<p>No teams created yet</p>
				) : (
					<ul>
						{teams?.map((team) => (
							<li key={team.id} className="p-2 border-b">
								{team.name}

								<button
									className="mx-4 px-4 py-3 text-white bg-red-400 rounded-lg"
									onClick={() => handleDelete(team.id)}
								>
									Delete
								</button>
								<button
									className="mx-4 px-4 py-3 text-white bg-blue-400 rounded-lg"
									onClick={() => openEditTeam(team)}
								>
									Edit
								</button>
								<Link href={`/teams/${team.id}`}>View </Link>
							</li>
						))}
					</ul>
				)}

				<AppModal
					isOpen={isOpen}
					modalData={modalData}
					modalType={modalType}
					closeModal={closeModal}
				/>
			</div>
		);
};

export default TeamList;
