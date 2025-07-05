"use client";
import React, { useState } from "react";
import PlayerItemCard from "./PlayerItemCard";
import { Player } from "@/store/types";
import { Button } from "../ultils/button";

const SquadSelection = ({
	availablePlayers,
}: {
	availablePlayers: Player[];
}) => {
	const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
	const [confirmedSquad, setConfirmedSquad] = useState<boolean>(false);

	const hasMinimumPlayers = selectedPlayers.length >= 6;
	const isFullSquad = selectedPlayers.length === 13;
	const playersNeeded = Math.max(0, 6 - selectedPlayers.length);

	return (
		<div className="">
			{confirmedSquad && (
				<div className="mb-4 p-4 mt-5 bg-green-50 border border-green-200 rounded-lg">
					<div className="flex justify-between items-start">
						<div>
							<p className="text-green-800 font-medium">✓ Squad Confirmed</p>
							<p className="text-sm text-green-600 mt-1">
								{selectedPlayers.length} players selected
							</p>
							<div className="mt-3">
								<p className="text-sm font-medium text-green-700 mb-2">
									Selected Players:
								</p>
								<div className="flex flex-wrap gap-2">
									{selectedPlayers.map((playerData) => {
										const player = availablePlayers.find(
											(p) => p.id === playerData.id
										);
										if (!player) return null;
										return (
											<span
												key={player.id}
												className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
											>
												{player.name}
											</span>
										);
									})}
								</div>
							</div>
						</div>
						<Button
							className="px-4 py-2 text-sm"
							icon={false}
							onClick={() => setConfirmedSquad(false)}
						>
							Edit Squad
						</Button>
					</div>
				</div>
			)}

			<div
				className={`grid grid-cols-2 w-full mt-5 divide-x divide-gray-200 transition-all duration-500 ease-in-out overflow-hidden ${
					confirmedSquad ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr]"
				}`}
			>
				<div className="min-h-0 pr-4">
					<h4 className="font-medium text-base">Available Players</h4>
					<div className="h-full overflow-y-scroll max-h-96 mt-4">
						<ul className="flex flex-col gap-3">
							{availablePlayers
								.filter(
									(player) =>
										!selectedPlayers.some(
											(selectedPlayer) => selectedPlayer.id === player.id
										)
								)
								.map((player) => (
									<PlayerItemCard
										action={() =>
											setSelectedPlayers((prevState) => {
												if (prevState.length >= 13) {
													return prevState;
												}
												return [...prevState, player];
											})
										}
										key={player.id}
										player={player}
									/>
								))}
						</ul>
					</div>
				</div>
				<div className="min-h-0 pl-4">
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
					<div className="h-full overflow-y-scroll max-h-96 mt-4">
						<ul className="flex flex-col gap-3 bg-gray-50 rounded-lg min-h-32 p-4">
							{selectedPlayers.length === 0 ? (
								<div className="flex size-full justify-center items-center">
									<p className="text-sm text-gray-500 text-wrap text-center">
										Select players from the left
									</p>
								</div>
							) : (
								selectedPlayers.map((playerData) => {
									const player = availablePlayers.find(
										(p) => p.id === playerData.id
									);
									if (!player) return null;
									return (
										<PlayerItemCard
											action={() => {
												setSelectedPlayers((prevState) =>
													prevState.filter((p) => p.id !== playerData.id)
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

			{!confirmedSquad && (
				<div className="mt-4 flex justify-end">
					<Button
						className="px-6 py-2 text-center justify-center"
						icon={false}
						disabled={!hasMinimumPlayers}
						onClick={() => setConfirmedSquad(true)}
					>
						Confirm Squad
					</Button>
				</div>
			)}
		</div>
	);
};

export default SquadSelection;
