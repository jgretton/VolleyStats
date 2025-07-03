"use client";
import React from "react";
import { PageLayout } from "../components/layouts/PageLayout";
import { Button } from "../components/ultils/button";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../components/modal/AppModal";
import { useClubStore } from "@/store";
import { MatchData } from "@/store/types";
import TeamMatchSection from "../components/matches/TeamMatchSection";
import { CalendarIcon } from "@heroicons/react/24/outline";

const Page = () => {
	const {
		isOpen,
		modalType,
		modalData,
		closeModal,
		openCreateMatch,
		openAddSeason,
		openAddTeam,
	} = useAppModal();

	const { club, getAllTeamMatches } = useClubStore();
	const matches = getAllTeamMatches();
	console.log(matches);

	const hasSeason = club.currentSeasonId.trim();

	//check if there is a season created? Need a season. if no current season, open season creation.

	//check if any matches for any team. if not suggest creating match.

	const renderContent = () => {
		// No season
		if (hasSeason === "") {
			return (
				<div className="text-center py-8 text-gray-500">
					<CalendarIcon className="size-8 mx-auto mb-2 text-gray-300" />
					<p>You have not created a season or set one as your current.</p>
					<p className="text-sm text-gray-400 mt-1">
						Create a season to get started
					</p>
					<Button className="mt-3" onClick={openAddSeason}>
						Create Season
					</Button>
				</div>
			);
		}

		// No teams
		if (club.teams.length < 1) {
			return (
				<div className="text-center py-8 text-gray-500">
					<CalendarIcon className="size-8 mx-auto mb-2 text-gray-300" />
					<p>
						You have not created a team yet. To start creating matches you need
						a team to assign them to.
					</p>
					<p className="text-sm text-gray-400 mt-1">
						Create a team to get started
					</p>
					<Button className="mt-3" onClick={openAddTeam}>
						Create Team
					</Button>
				</div>
			);
		}

		// No matches
		if (matches.length === 0) {
			return (
				<div className="text-center py-8 text-gray-500">
					<CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
					<p>No matches scheduled or recorded</p>
					<p className="text-sm text-gray-400 mt-1">
						Create a match to get started
					</p>
				</div>
			);
		}

		// Show matches
		return matches.map((teamData: MatchData) => (
			<TeamMatchSection teamData={teamData} key={teamData.teamId} />
		));
	};

	return (
		<PageLayout
			title="Matches"
			subtitle="Create, view and manage all matches for your club"
			actions={
				<Button type="button" size="md" onClick={openCreateMatch}>
					Create Match
				</Button>
			}
		>
			<div className="size-full">
				<div className="grid grid-cols-1 grid-flow-row gap-10">
					{renderContent()}
				</div>
			</div>
			<AppModal
				closeModal={closeModal}
				isOpen={isOpen}
				modalType={modalType}
				modalData={modalData}
			/>
		</PageLayout>
	);
};

export default Page;
