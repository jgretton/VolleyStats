"use client";

import MatchInfoCard from "@/app/components/cards/MatchInfoCard";
import { PageLayout } from "@/app/components/layouts/PageLayout";
import { LineupConfirmation } from "@/app/components/matches/LineupConfirmation";
import SquadSelection from "@/app/components/matches/SquadSelection";
import StartingLineupSelection from "@/app/components/matches/StartingLineupSelection";
import { useClubStore } from "@/store";
import { Match, Player } from "@/store/types";
import { useParams } from "next/navigation";

const Page = () => {
	const { getSingleMatch, getTeamPlayersByTeamId, club } = useClubStore();
	const params = useParams();
	const matchId = params.matchId as string;

	const matchData: Match = getSingleMatch(matchId);
	const availablePlayers: Player[] = getTeamPlayersByTeamId(matchData.teamId);

	// console.log("selected", selectf)
	const confirmedSquad = club.matches.find(
		(match) => match.id === matchData.id
	)?.confirmedSquad;

	const confirmedLineup = true;

	const mockAssignments = [
		{ position: 1, player: { id: "1", name: "Sarah Johnson", number: 8 } },
		{ position: 2, player: { id: "2", name: "Mike Chen", number: 12 } },
		{ position: 3, player: { id: "3", name: "Emma Wilson", number: 3 } },
		{ position: 4, player: { id: "4", name: "Jake Thompson", number: 7 } },
		{ position: 5, player: { id: "5", name: "Lisa Rodriguez", number: 15 } },
		{ position: 6, player: { id: "6", name: "Tom Anderson", number: 11 } },
	];

	const mockLibero = { id: "7", name: "Alex Kim", number: 5 };

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
							<StartingLineupSelection matchId={matchData.id} />
						)}

						{confirmedLineup && (
							<LineupConfirmation
								assignments={mockAssignments}
								libero={mockLibero}
								confirmedLineup={confirmedLineup}
								onEditLineup={() => console.log("helo")}
							/>
						)}
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Page;
