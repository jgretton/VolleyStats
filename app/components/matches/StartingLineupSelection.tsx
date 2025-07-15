import { Player } from "@/store/types";
import React, { useState, useEffect } from "react";
import { Button } from "../ultils/button";
import { useClubStore } from "@/store";
import PlayerItemCard from "./PlayerItemCard";
import { getPlayerInitials } from "@/utils";

/*
Create a initials generator
take away selected players from available player list.
*/

type AssignmentData = {
	position: number;
	player: Player | null;
};
const StartingLineupSelection = ({
	matchId,
	onLineupConfirmed,
}: {
	matchId: string;
	onLineupConfirmed?: () => void;
}) => {
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
	const {
		getSelectedPlayersFromMatchId,
		updateMatchStartingLinup,
		getMatchStartingLineup,
	} = useClubStore();

	// Load existing lineup on component mount
	useEffect(() => {
		const existingLineup = getMatchStartingLineup(matchId);
		if (existingLineup && existingLineup.length > 0) {
			// Populate court positions
			const courtAssignments = existingLineup
				.filter((item) => typeof item.position === "number")
				.map((item) => ({
					position: item.position as number,
					player: item.player,
				}));

			// Create new assignments array with existing data
			const newAssignments = [
				{ position: 1, player: null },
				{ position: 2, player: null },
				{ position: 3, player: null },
				{ position: 4, player: null },
				{ position: 5, player: null },
				{ position: 6, player: null },
			];

			// Update with existing assignments
			courtAssignments.forEach((assignment) => {
				const index = newAssignments.findIndex(
					(a) => a.position === assignment.position
				);
				if (index !== -1) {
					newAssignments[index] = {
						position: assignment.position,
						player: assignment.player,
					};
				}
			});

			setAssignments(newAssignments);

			// Set libero if exists
			const existingLibero = existingLineup.find(
				(item) => item.position === "libero"
			)?.player;
			if (existingLibero) {
				setLibero(existingLibero);
			}
		}
	}, [matchId, getMatchStartingLineup]);

	const displayOrder = [4, 3, 2, 5, 6, 1]; // grid order

	const courtPositions = displayOrder.map((pos) =>
		assignments.find((a) => a.position === pos)
	);

	const handlePostitionSelect = (position: string | number) => {
		setSelectedPosition(position);
		setOpenPlayerSelectModal(true);
	};

	const handlePlayerSelect = (player: Player) => {
		if (selectedPosition === "libero") {
			console.log(player);
			setLibero(player);
		} else if (typeof selectedPosition === "number") {
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

	const removeSelectedPlayer = (player: Player) => {
		setAssignments((prevState) =>
			prevState.map((assignment) =>
				assignment.player?.id === player.id
					? { ...assignment, player: null } // Keep original position
					: assignment
			)
		);
	};

	const selectedMatchPlayers = getSelectedPlayersFromMatchId(matchId);

	const handleLineupConfirmation = () => {
		//check to see if the assignments has all positions filled.
		const checkForNull = assignments.find(
			(position) => position.player === null
		);

		if (checkForNull) console.log("PICK POSITIONS");
		else {
			// Create lineup array with all court positions
			const lineup = assignments
				.filter((assignment) => assignment.player !== null)
				.map((assignment) => ({
					position: assignment.position,
					player: assignment.player!,
				}));

			// Add libero if assigned
			if (libero) {
				lineup.push({ position: "libero" as const, player: libero });
			}

			updateMatchStartingLinup(matchId, lineup);

			// Call the callback to notify parent component
			if (onLineupConfirmed) {
				onLineupConfirmed();
			}
		}
		// If filled, confirm
	};
	const isLineupComplete = assignments.every(
		(position) => position.player !== null
	);
	return (
		<div className="flex lg:flex-row flex-col">
			<div className="flex-1">
				<p className="text-sm font-medium text-gray-700 mb-3">
					Court Formation:
				</p>

				{/* Mini Court Layout */}
				<div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm">
					<div className="grid grid-cols-3 grid-rows-2 gap-2 h-32">
						{courtPositions.map((player) => {
							// const assignment = assignments.find((a) => a.position === pos);
							return (
								<div
									key={player?.position}
									// className="bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center text-xs"
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
												onClick={() => handlePostitionSelect(player?.position)}
												className="size-full flex flex-col items-center justify-center h-full cursor-pointer bg-blue-100 rounded-lg"
											>
												<span className="text-xs text-gray-900">
													{player.player.number}
												</span>
												<span className="text-sm font-bold text-gray-600 mt-1">
													{getPlayerInitials(player.player.name)}
												</span>
											</button>
										</>
									) : (
										<button
											onClick={() =>
												player?.position &&
												handlePostitionSelect(player.position)
											}
											className="size-full flex flex-col items-center justify-center h-full cursor-pointer"
										>
											<span className="text-xs  text-gray-6   00">
												P{player?.position}
											</span>
										</button>
									)}
								</div>
							);
						})}
					</div>

					{/* Libero Display */}
					<div
						className={`
    mt-4 rounded-lg border-2 transition-all duration-200  w-full relative mx-auto max-w-fit
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
									className="flex flex-row items-center size-full rounded-lg py-2 px-4 cursor-pointer gap-2 bg-blue-200"
								>
									<span className="text-sm font-medium text-gray-600">
										Libero:
									</span>
									<div className="flex items-center  gap-2">
										<span className="text-xs font-bold"> #{libero.number}</span>
										<span className="text-sm font-medium">
											{getPlayerInitials(libero.name)}
										</span>
									</div>
								</button>
							</>
						) : (
							<button
								onClick={() => handlePostitionSelect("libero")}
								className="flex flex-col items-center size-full cursor-pointer py-2 px-4"
							>
								<span className="text-sm font-medium">
									Libero{" "}
									<span className="text-xs mt-1 font-light text-gray-600">
										(Optional)
									</span>
								</span>
							</button>
						)}
					</div>
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

				<Button
					type="button"
					icon={false}
					variant="primary"
					onClick={handleLineupConfirmation}
				>
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
										) && libero?.id !== player.id
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
