"use client";
import { useClubStore } from "@/store";
import React from "react";
import PlayerList from "../players/playerList";
const TeamView = ({ teamId }: { teamId: string }) => {
	const getTeam = useClubStore((state) => state.getTeamById);
	const team = getTeam(teamId);
	if (!team) {
		return <div>Team not found</div>;
	}

	return (
		<div className="relative p-10">
			<h2 className="font-medium text-2xl">
				Team <br />
				<span className="font-normal text-xl pl-2">{team.name}</span>
			</h2>
			<div className="mt-10">
				<PlayerList teamId={teamId} />
			</div>
		</div>
	);
};

export default TeamView;
