"use client";

import MatchInfoCard from "@/app/components/cards/MatchInfoCard";
import { PageLayout } from "@/app/components/layouts/PageLayout";
import { useClubStore } from "@/store";
import { Match } from "@/store/types";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const availablePlayers = [
	{ id: "1", name: "James Wilson" },
	{ id: "2", name: "Sarah Mitchell" },
	{ id: "3", name: "Tom Rodriguez" },
	{ id: "4", name: "Emma Thompson" },
	{ id: "5", name: "Michael Chen" },
	{ id: "6", name: "Lucy Roberts" },
	{ id: "7", name: "David Kumar" },
	{ id: "8", name: "Sophie Clarke" },
	{ id: "9", name: "Alex Turner" },
	{ id: "10", name: "Maya Patel" },
	{ id: "11", name: "Ryan O'Connor" },
	{ id: "12", name: "Zoe Anderson" },
	{ id: "13", name: "Josh Campbell" },
];

type PlayerData = {
	id: string;
	name: string;
};

const PlayerItem = ({
	player,
	action,
	remove,
}: {
	player: PlayerData;
	action: React.MouseEventHandler;
	remove?: boolean;
}) => {
	return (
		<li
			className={`border border-gray-200 rounded-lg py-3 px-2 hover:shadow-sm cursor-pointer transition-all inline-flex justify-between items-center ${
				remove
					? "hover:bg-red-50 hover:border-red-500"
					: "hover:border-blue-500 hover:bg-blue-100 "
			}`}
			onClick={action}
		>
			<span className="text-sm font-medium">{player.name}</span>
			{remove && <span className="text-red-500 text-xs">remove</span>}
		</li>
	);
};

const Page = () => {
	const { getSingleMatch } = useClubStore();
	const params = useParams();
	const matchId = params.matchId as string;

	const matchData: Match = getSingleMatch(matchId);
	const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

	const hasMinimumPlayers = selectedPlayers.length >= 6;
	const isFullSquad = selectedPlayers.length === 13;
	const playersNeeded = Math.max(0, 6 - selectedPlayers.length);

	return (
		<PageLayout
			title="Match Setup"
			subtitle="Select your squad and starting lineup"
		>
			<div className="size-full">
				<MatchInfoCard matchData={matchData} />
				<div className="mt-8 max-w-7xl border border-gray-200 rounded-lg p-6">
					<div className="mb-6">
						<h3 className="text-xl font-semibold text-gray-900">
							Squad Selection
						</h3>
						<p className="text-sm text-gray-600 mt-1">
							Please confirm the squad for this match
						</p>

						<div className=" grid grid-cols-2 w-full mt-5 divide-x divide-gray-200 ">
							<div className="pr-4">
								<h4 className="font-medium text-base">Available Players</h4>
								<div className=" h-full overflow-y-scroll max-h-96 mt-4">
									<ul className="flex flex-col gap-3">
										{availablePlayers
											.filter((player) => !selectedPlayers.includes(player.id))
											.map((player) => (
												<PlayerItem
													action={() =>
														setSelectedPlayers((prevState) => [
															...prevState,
															player.id,
														])
													}
													key={player.id}
													player={player}
												/>
											))}
									</ul>
								</div>
							</div>
							<div className="pl-4">
								<div className="flex justify-between items-center">
									<h4 className="font-medium text-base">
										Selected Players{" "}
										<span className="tracking-wider text-sm">
											({selectedPlayers.length}/13)
										</span>
									</h4>
									{!hasMinimumPlayers && (
										<span className="bg-yellow-100 rounded-lg px-1 py-2 text-xs text-yellow-700">
											Select {playersNeeded} more
										</span>
									)}
									{isFullSquad && (
										<span className="bg-red-100 rounded-lg px-1 py-2 text-xs text-red-700">
											Squad full
										</span>
									)}
								</div>
								<div className=" h-full overflow-y-scroll max-h-96 mt-4">
									<ul className="flex flex-col gap-3 bg-gray-50 rounded-lg min-h-32 p-4">
										{selectedPlayers.length === 0 ? (
											<div className="flex size-full justify-center items-center">
												<p className="text-sm text-gray-500 text-wrap text-center">
													Select players from the left
												</p>
											</div>
										) : (
											selectedPlayers.map((playerId) => {
												const player = availablePlayers.find(
													(p) => p.id === playerId
												);
												if (!player) return null;
												return (
													<PlayerItem
														action={() => {
															setSelectedPlayers((prevState) =>
																prevState.filter((p) => p !== playerId)
															);
														}}
														key={player.id}
														player={player}
														remove
													/>
												);
											})
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Page;
