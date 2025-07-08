import { Player } from "@/store/types";
import React, { useState } from "react";
import { Button } from "../ultils/button";
import { useClubStore } from "@/store";
import PlayerItemCard from "./PlayerItemCard";
import VolleyballCourt from "../ultils/VolleyballCourt";
import Court from "../ultils/Court";
import { getPlayerInitials } from "@/utils";

/*
Create a initials generator
take away selected players from available player list.
*/

type AssignmentData = {
	position: number;
	player: Player | null;
};
const StartingLineupSelection = ({ matchId }: { matchId: string }) => {
	const [assignments, setAssignments] = useState<AssignmentData[]>([
		{ position: 1, player: null },
		{ position: 2, player: null },
		{ position: 3, player: null },
		{ position: 4, player: null },
		{ position: 5, player: null },
		{ position: 6, player: null },
	]);
	const [libero, setLibero] = useState<Player | null>(null);
	const [selectedPosition, setSelectedPosition] = useState<
		number | string | null
	>(null);
	const [openPlayerSelectModal, setOpenPlayerSelectModal] =
		useState<boolean>(false);
	const { getSelectedPlayersFromMatchId } = useClubStore();

	const displayOrder = [4, 3, 2, 5, 6, 1]; // grid order

	const courtPositions = displayOrder.map((pos) =>
		assignments.find((a) => a.position === pos)
	);

	const handlePostitionSelect = (position: string | number) => {
		setSelectedPosition(position);
		setOpenPlayerSelectModal(true);
	};

	const handlePlayerSelect = (player) => {
		if (selectedPosition === "libero") {
			setLibero(player);
		} else {
			const newAssignments = [...assignments];
			newAssignments[selectedPosition - 1] = {
				position: selectedPosition,
				player: player,
			};
			setAssignments(newAssignments);
		}
		setOpenPlayerSelectModal(false);
		setSelectedPosition(null);
	};

	const removeSelectedPlayer = (player) => {
		setAssignments((prevState) =>
			prevState.map((assignment) =>
				assignment.player?.id === player.id
					? { ...assignment, player: null } // Keep original position
					: assignment
			)
		);
	};

	const selectedMatchPlayers = getSelectedPlayersFromMatchId(matchId);

	const isLineupComplete = assignments.every(
		(position) => position.player !== null
	);
	return (
		<div className="flex lg:flex-row flex-col">
			<div className="max-w-lg w-full p-5 bg-green-800/70 rounded-xl flex flex-col">
				<Court>
					<div className="size-full grid grid-cols-3 grid-rows-2 gap-2 relative">
						{courtPositions.map((player) => {
							return (
								<div className="size-full p-4" key={player?.position}>
									<div
										className={`
    relative size-full rounded-lg border-2 transition-all duration-200 cursor-pointer
    ${
			player?.player
				? "bg-white border-blue-500 shadow-sm hover:shadow-md"
				: "bg-gray-50/50 border-gray-300 hover:border-blue-400 hover:bg-gray-100"
		}
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `}
									>
										{player?.player ? (
											<>
												<button
													className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full size-6 flex items-center justify-center text-xs font-bold transition-colors duration-200 cursor-pointer"
													onClick={() => {
														removeSelectedPlayer(player.player);
													}}
												>
													×
												</button>
												<button
													onClick={() =>
														handlePostitionSelect(player?.position)
													}
													className="size-full flex flex-col items-center justify-center h-full cursor-pointer"
												>
													<span className="text-lg font-bold text-gray-900">
														{player.player.number}
													</span>
													<span className="text-xs font-medium text-gray-600 mt-1">
														{getPlayerInitials(player.player.name)}
													</span>
												</button>
											</>
										) : (
											<button
												onClick={() => handlePostitionSelect(player?.position)}
												className="size-full flex flex-col items-center justify-center h-full cursor-pointer"
											>
												<span className="text-sm font-medium text-gray-800">
													Position {player?.position}
												</span>
												<span className="text-xs text-gray-900 mt-1">
													Click to assign
												</span>
											</button>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</Court>
				<div
					className={`
    mt-4 px-4 py-3 rounded-lg border-2 transition-all duration-200 w-full max-w-xs relative mx-auto
    ${
			libero
				? "bg-white border-blue-500 shadow-sm hover:shadow-md text-gray-900"
				: "bg-gray-50/50 border-gray-300 hover:border-blue-400 hover:bg-gray-100 text-gray-800"
		}
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `}
				>
					{libero ? (
						<>
							{/* Clear button */}
							<button
								className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full size-6 flex items-center justify-center text-xs font-bold transition-colors duration-200 z-10 cursor-pointer"
								onClick={() => {
									setLibero(null);
								}}
							>
								×
							</button>

							<button
								onClick={() => handlePostitionSelect("libero")}
								className="flex flex-col items-center size-full cursor-pointer"
							>
								<span className="text-sm font-medium text-gray-600">
									Libero
								</span>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-lg font-bold">{libero.number}</span>
									<span className="text-sm font-medium">
										{getPlayerInitials(libero.name)}
									</span>
								</div>
							</button>
						</>
					) : (
						<button
							onClick={() => handlePostitionSelect("libero")}
							className="flex flex-col items-center size-full cursor-pointer"
						>
							<span className="text-sm font-medium">Libero</span>
							<span className="text-xs mt-1">Optional - Click to assign</span>
						</button>
					)}
				</div>
			</div>
			<div className="mt-10">
				<h4 className="text-base font-medium text-gray-800">
					Starting Lineup Status
				</h4>
				<div className="flex flex-col gap-1 mt-2">
					<div className="inline-flex gap-2 items-center">
						<div
							className={`size-2 rounded-full ${
								isLineupComplete ? "bg-green-500" : "bg-red-500"
							}`}
						></div>

						<p
							className={`${
								!isLineupComplete ? "text-red-500" : "text-green-700"
							} text-sm`}
						>
							{assignments.filter((a) => a.player).length}/6 positions filled
						</p>
					</div>
					<div className="inline-flex gap-2 items-center">
						<div
							className={`size-2 rounded-full ${
								libero === null ? "bg-gray-500" : "bg-green-500"
							}`}
						></div>

						<p
							className={`${
								libero === null ? "text-gray-500" : "text-green-700"
							} text-sm`}
						>
							{libero === null ? "Libero not assigned" : "Libero assigned"}
						</p>
					</div>
				</div>

				<Button type="button" icon={false} variant="primary">
					Confirm Lineup
				</Button>
			</div>

			{openPlayerSelectModal && (
				<div className="absolute inset-0 bg-black/40 flex justify-center items-center">
					<div className="max-w-md p-4 bg-white rounded-xl w-full overflow-hidden">
						<h4 className="font-medium text-base">
							Select player for position {selectedPosition}
						</h4>
						<div className="grid gap-3 max-h-96 mt-5 overflow-y-scroll pb-5 ">
							{selectedMatchPlayers
								.filter(
									(player) =>
										!assignments.some(
											(selectedPlayer) =>
												selectedPlayer.player?.id === player.id
										)
								)
								.map((player) => (
									<PlayerItemCard
										player={player}
										key={player.id}
										action={() => handlePlayerSelect(player)}
									/>
								))}
						</div>
						<Button
							type="button"
							variant="secondary"
							icon={false}
							onClick={() => setOpenPlayerSelectModal(false)}
						>
							Close modal
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default StartingLineupSelection;
