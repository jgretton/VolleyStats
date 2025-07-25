/* eslint-disable react/no-unescaped-entities */
"use client";
import { MatchData } from "@/store/types";
import {
	CalendarDateRangeIcon,
	CalendarIcon,
	Cog6ToothIcon,
	EyeIcon,
	TrophyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import VenueBadge from "./VenueBadge";
import FormatDate from "../ultils/FormatDate";

const TeamMatchSection = ({ teamData }: { teamData: MatchData }) => {
	const nextUpcoming = teamData.upcoming.sort(
		//+date as i need to convert them to numbers.
		(a, b) => +new Date(a.date) - +new Date(b.date)
	)[0];

	const squadSelected = nextUpcoming.selectedPlayers.length > 0;
	const lineupSet = (nextUpcoming.startingLineup?.length ?? 0) > 0;
	const completedTasks = [squadSelected, lineupSet].filter(Boolean).length;

	return (
		<div className="rounded-lg w-full bg-gray-50 border border-gray-200  p-6">
			<div className="flex justify-between">
				<h2 className="inline-flex items-center gap-2 text-lg font-medium text-gray-900">
					<TrophyIcon className="size-5 text-gray-700" />
					{teamData.teamName}
				</h2>
				<Link href={"/stats"} className="text-sm text-blue-500 hover:underline">
					View all matches
				</Link>
			</div>

			<div className="mt-4">
				<h3 className="text-gray-700 text-sm font-medium inline-flex items-center gap-2">
					<CalendarDateRangeIcon className="size-4 text-blue-500" />
					Next Match
				</h3>
				<div className="flex flex-col gap-3 mt-2">
					<div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<div className="flex gap-3 items-center">
									<h4 className="text-gray-900 font-medium">
										vs {nextUpcoming.opponent}
									</h4>
									<VenueBadge venue={nextUpcoming.venue} />
								</div>
								<div className="inline-flex mt-2">
									<span className="flex items-center gap-2 text-sm text-gray-600">
										<CalendarIcon className="size-4" />
										<FormatDate date={nextUpcoming.date} />
									</span>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<Link
									href={`/matches/${nextUpcoming.id}`}
									className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer"
								>
									<EyeIcon className="size-4" />
									View Match
								</Link>
								<Link
									href={`/matches/${nextUpcoming.id}/setup`}
									className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
								>
									<Cog6ToothIcon className="size-4" />
									Match Setup
								</Link>
							</div>
						</div>

						<div className="mt-3 pt-3 border-t border-gray-100">
							<div className="flex items-center gap-2">
								<span className="text-xs text-gray-500">
									Match preparation progress
								</span>
								<span className="text-xs text-gray-400">
									({completedTasks} of 2 complete)
								</span>
							</div>
							<div className="mt-2 flex gap-4">
								<div className="flex items-center gap-2">
									<div
										className={`size-2 rounded-full ${
											squadSelected ? "bg-green-500" : "bg-gray-300"
										}`}
									/>
									<span className="text-xs text-gray-600">
										Available players selected
									</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className={`size-2 rounded-full ${
											lineupSet ? "bg-green-500" : "bg-gray-300"
										}`}
									/>
									<span className="text-xs text-gray-600">
										Starting lineup finalised
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamMatchSection;
