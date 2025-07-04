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
		<div className="bg-white border border-gray-200 rounded-lg p-4">
			<div className="text-center">
				<VenueBadge venue={matchData.venue} />
			</div>
			<div className="flex gap-10 justify-center items-start mt-4">
				<span className="text-lg font-medium text-gray-900 flex-1 text-end">
					{teamName}
				</span>
				<div className="flex flex-col text-center gap-2">
					<span className="text-gray-800 font-medium text-lg">VS</span>
					<span className="text-sm text-gray-500">
						<FormatDate date={matchData.date} />
					</span>
				</div>
				<span className="text-lg font-medium text-gray-900 flex-1 text-start">
					{matchData.opponent}
				</span>
			</div>
		</div>
	);
};

export default MatchInfoCard;
