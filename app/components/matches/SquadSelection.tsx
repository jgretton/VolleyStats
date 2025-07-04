"use client";
import React, { useState } from "react";
import PlayerItemCard from "./PlayerItemCard";
import { Player } from "@/store/types";

const SquadSelection = ({
	availablePlayers,
}: {
	availablePlayers: Player[];
}) => {
	const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

	const hasMinimumPlayers = selectedPlayers.length >= 6;
	const isFullSquad = selectedPlayers.length === 13;
	const playersNeeded = Math.max(0, 6 - selectedPlayers.length);
	return (
		<div className=" grid grid-cols-2 w-full mt-5 divide-x divide-gray-200 ">
			<div className="pr-4">
				<h4 className="font-medium text-base">Available Players</h4>
				<div className=" h-full overflow-y-scroll max-h-96 mt-4">
					<ul className="flex flex-col gap-3">
						{availablePlayers
							.filter((player) => !selectedPlayers.includes(player.id))
							.map((player) => (
								<PlayerItemCard
									action={() =>
										setSelectedPlayers((prevState) => {
											if (
												prevState.includes(player.id) ||
												prevState.length >= 13
											) {
												return prevState;
											}
											return [...prevState, player.id];
										})
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
								const player = availablePlayers.find((p) => p.id === playerId);
								if (!player) return null;
								return (
									<PlayerItemCard
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
	);
};

export default SquadSelection;
