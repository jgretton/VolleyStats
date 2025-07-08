import { getPlayerInitials } from "@/utils";

export const LineupConfirmation = ({
	assignments,
	libero,
	confirmedLineup,
	onEditLineup,
}) => {
	const filledPositions = assignments.filter((a) => a.player).length;

	if (!confirmedLineup) return null;

	return (
		<div className="mb-4 p-4 mt-5 bg-green-50 border border-green-200 rounded-lg w-full">
			<div className="flex flex-col">
				{/* Header */}
				<div className="flex flex-row justify-between items-start">
					<div className="flex-1">
						<p className="text-green-800 font-medium">
							✓ Starting Lineup Confirmed
						</p>
						<p className="text-sm text-gray-600 mt-1">
							{filledPositions} starters{libero ? " + 1 libero" : ""}
						</p>
					</div>
					<button
						className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
						onClick={onEditLineup}
					>
						Edit Lineup
					</button>
				</div>

				{/* Main Content */}
				<div className="mt-4 flex gap-6">
					{/* Court Formation Display */}
					<div className="flex-1">
						<p className="text-sm font-medium text-gray-700 mb-3">
							Court Formation:
						</p>

						{/* Mini Court Layout */}
						<div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm">
							<div className="grid grid-cols-3 grid-rows-2 gap-2 h-32">
								{[4, 3, 2, 5, 6, 1].map((pos) => {
									const assignment = assignments.find(
										(a) => a.position === pos
									);
									return (
										<div
											key={pos}
											className="bg-gray-50 border border-gray-200 rounded flex flex-col items-center justify-center text-xs"
										>
											{assignment?.player ? (
												<>
													<span className="font-bold text-gray-900">
														{assignment.player.number}
													</span>
													<span className="text-gray-600 text-[10px]">
														{getPlayerInitials(assignment.player.name)}
													</span>
												</>
											) : (
												<span className="text-gray-400">P{pos}</span>
											)}
										</div>
									);
								})}
							</div>

							{/* Libero Display */}
							{libero && (
								<div className="mt-2 flex justify-center">
									<div className="bg-blue-100 border border-blue-200 rounded px-2 py-1 text-xs">
										<span className="text-blue-800 font-medium">
											Libero: {libero.number} {getPlayerInitials(libero.name)}
										</span>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Player List */}
					<div className="flex-1">
						<p className="text-sm font-medium text-gray-700 mb-3">
							Starting Players:
						</p>
						<div className="space-y-2">
							{assignments
								.filter((a) => a.player)
								.sort((a, b) => a.position - b.position)
								.map((assignment) => (
									<div
										key={assignment.position}
										className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
									>
										<div className="flex items-center gap-2">
											<span className="text-gray-500 font-medium text-xs">
												P{assignment.position}
											</span>
											<span className="text-gray-900">
												{assignment.player.name}
											</span>
										</div>
										<span className="font-bold text-gray-800">
											#{assignment.player.number}
										</span>
									</div>
								))}

							{libero && (
								<div className="flex items-center justify-between px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm">
									<div className="flex items-center gap-2">
										<span className="text-blue-600 font-medium text-xs">
											LIB
										</span>
										<span className="text-gray-900">{libero.name}</span>
									</div>
									<span className="font-bold text-gray-800">
										#{libero.number}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
