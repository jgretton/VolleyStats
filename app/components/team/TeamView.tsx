"use client";
import { useClubStore } from "@/store";
import React from "react";
import PlayerList from "../players/playerList";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../modal/AppModal";
const TeamView = ({ teamId }: { teamId: string }) => {
	const { isOpen, modalType, modalData, closeModal, openAddPlayer } =
		useAppModal();

	const getTeam = useClubStore((state) => state.getTeamById);
	const team = getTeam(teamId);
	if (!team) {
		return <div>Team not found</div>;
	}

	return (
		<div className="relative p-10">
			Team : {team.name}
			<div className="mt-20">
				<button
					type="button"
					onClick={() => openAddPlayer(teamId)}
					className="px-4 py-2 rounded-md bg-teal-300 cursor-pointer"
				>
					+ Add Player
				</button>

				<PlayerList teamId={teamId} />
			</div>
			<AppModal
				isOpen={isOpen}
				modalType={modalType}
				modalData={modalData}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default TeamView;
