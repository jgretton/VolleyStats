"use client";
import React from "react";
import VenueBadge from "../matches/VenueBadge";
import { Match } from "@/store/types";
import { useClubStore } from "@/store";
import FormatDate from "../ultils/FormatDate";

const MatchInfoCard = ({ matchData }: { matchData: Match }) => {
	const { getTeamById } = useClubStore();
	const { name: teamName } = getTeamById(matchData.teamId);
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
			<div className="flex items-center gap-4">
				<h3 className="text-lg font-medium text-gray-900">
					{teamName} vs {matchData.opponent}
				</h3>
				<span className="text-gray-400">•</span>
				<span className="text-sm text-gray-600">
					<FormatDate date={matchData.date} />
				</span>
				<VenueBadge venue={matchData.venue} />
			</div>
		</div>
	);
};

export default MatchInfoCard;
