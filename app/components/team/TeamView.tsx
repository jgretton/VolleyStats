"use client";
import { useClubStore } from "@/store";
import React from "react";
import { PlayerInput } from "../setup/PlayerInput";
import PlayerList from "../players/playerList";
const TeamView = ({ teamId }: { teamId: string }) => {
	const getTeam = useClubStore((state) => state.getTeamById);
	const team = getTeam(teamId);
	if (!team) {
		return <div>Team not found</div>;
	}

	return (
		<div className="relative">
			Team : {team.name}
			<div className="mt-20">
				<PlayerInput teamId={teamId} />
				<PlayerList teamId={teamId} />
			</div>
		</div>
	);
};

export default TeamView;
