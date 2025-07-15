"use client";

import MatchInfoCard from "@/app/components/cards/MatchInfoCard";
import { PageLayout } from "@/app/components/layouts/PageLayout";
import { LineupConfirmation } from "@/app/components/matches/LineupConfirmation";
import SquadSelection from "@/app/components/matches/SquadSelection";
import StartingLineupSelection from "@/app/components/matches/StartingLineupSelection";
import { useClubStore } from "@/store";
import { Match, Player } from "@/store/types";
import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
	const {
		getSingleMatch,
		getTeamPlayersByTeamId,
		club,
		getMatchStartingLineup,
	} = useClubStore();
	const params = useParams();
	const matchId = params.matchId as string;

	const matchData: Match = getSingleMatch(matchId);
	const availablePlayers: Player[] = getTeamPlayersByTeamId(matchData.teamId);

	// console.log("selected", selectf)
	const confirmedSquad = club.matches.find(
		(match) => match.id === matchData.id
	)?.confirmedSquad;

	const startingLineup = getMatchStartingLineup(matchId);
	const confirmedLineup = startingLineup && startingLineup.length > 0;

	// Convert lineup to assignments format for LineupConfirmation component
	const assignments =
		startingLineup
			?.filter((item) => typeof item.position === "number")
			.map((item) => ({
				position: item.position as number,
				player: item.player,
			})) || [];

	const libero = startingLineup?.find(
		(item) => item.position === "libero"
	)?.player;

	// State to control whether to show lineup selection or confirmation
	const [isEditingLineup, setIsEditingLineup] = useState(false);

	const handleEditLineup = () => {
		setIsEditingLineup(true);
	};

	const handleLineupConfirmed = () => {
		setIsEditingLineup(false);
	};

	return (
		<PageLayout
			title="Match Setup"
			subtitle="Select your squad and starting lineup"
		>
			<div className="size-full">
				<MatchInfoCard matchData={matchData} />
				<div className="mt-8 max-w-7xl border border-gray-200 rounded-lg p-6">
					<div className="">
						<h3 className="text-xl font-semibold text-gray-900">
							Squad Selection
						</h3>
						<p className="text-sm text-gray-600 mt-1">
							Please confirm the squad for this match
						</p>

						<SquadSelection
							availablePlayers={availablePlayers}
							matchId={matchData.id}
						/>
					</div>
				</div>
				<div className="mt-8 max-w-7xl border border-gray-200 rounded-lg p-6">
					<div className="">
						<h3 className="text-xl font-semibold text-gray-900">
							Starting Lineup
						</h3>
						{!confirmedSquad ? (
							<p className="text-sm text-gray-600 mt-1">
								Before selecting your starting lineup you need to select your
								squad for this match
							</p>
						) : (
							<>
								{/* Show lineup selection if editing or no lineup exists */}
								{(isEditingLineup || !confirmedLineup) && (
									<StartingLineupSelection
										matchId={matchData.id}
										onLineupConfirmed={handleLineupConfirmed}
									/>
								)}

								{/* Show lineup confirmation if lineup exists and not editing */}
								{confirmedLineup && !isEditingLineup && (
									<LineupConfirmation
										assignments={assignments}
										libero={libero}
										confirmedLineup={confirmedLineup}
										onEditLineup={handleEditLineup}
									/>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Page;
