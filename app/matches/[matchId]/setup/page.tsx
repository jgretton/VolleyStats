"use client";

import MatchInfoCard from "@/app/components/cards/MatchInfoCard";
import { PageLayout } from "@/app/components/layouts/PageLayout";
import SquadSelection from "@/app/components/matches/SquadSelection";
import StartingLineupSelection from "@/app/components/matches/StartingLineupSelection";
import { useClubStore } from "@/store";
import { Match, Player } from "@/store/types";
import { useParams } from "next/navigation";

const Page = () => {
	const { getSingleMatch, getTeamPlayersByTeamId } = useClubStore();
	const params = useParams();
	const matchId = params.matchId as string;

	const matchData: Match = getSingleMatch(matchId);
	const availablePlayers: Player[] = getTeamPlayersByTeamId(matchData.teamId);

	// console.log("selected", selectf)

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
						{/* {confirmedSquad && <p>LETS DO THIS ITS CONFIRMED</p>} */}
						<p className="text-sm text-gray-600 mt-1">
							Before selecting your starting lineup you need to select your
							squad for this match
						</p>

						<StartingLineupSelection />
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Page;
