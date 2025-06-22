"use client";
import { useClubStore } from "@/store";
import React from "react";

const TeamView = ({ teamId }: { teamId: string }) => {
	const getTeam = useClubStore((state) => state.getTeamById);

	const team = getTeam(teamId);

	console.log(team);
	if (!team) {
		return <div>Team not found</div>;
	}

	return <div>Team : {team.name}</div>;
};

export default TeamView;
