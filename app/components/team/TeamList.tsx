"use client";

import React from "react";
import { useClubStore } from "@/store";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../modal/AppModal";
import { Team } from "@/store/types";
import { TeamCard } from "../cards/TeamCard";
const TeamList = () => {
	const { isOpen, modalData, modalType, closeModal, openAddTeam } =
		useAppModal();
	const teams = useClubStore((state) => state.club.teams);
	const clubName = useClubStore((state) => state.club.name);

	if (!teams) {
		return <div>No Teams</div>;
	} else
		return (
			<div className="">
				<h2 className="font-semibold text-2xl leading-none">
					{clubName} Teams
				</h2>
				<div className="mt-10">
					<button
						className="py-2 px-4 rounded-md bg-blue-500 text-white cursor-pointer"
						onClick={() => openAddTeam()}
					>
						+ add team
					</button>
				</div>
				{teams?.length === 0 ? (
					<div className="grid mt-10 gap-10">
						You havent added any teams, would you like to?
						<button
							type="button"
							className=" px-4 py-3 text-white bg-blue-400 rounded-lg cursor-pointer"
							onClick={() => openAddTeam()}
						>
							+ Add New Team
						</button>
						<AppModal
							closeModal={closeModal}
							modalData={modalData}
							modalType={modalType}
							isOpen={isOpen}
						/>
					</div>
				) : (
					<div className="mt-10 flex flex-wrap gap-10">
						{teams.map((team: Team) => (
							<TeamCard key={team.id} team={team} />
						))}
					</div>
				)}

				<AppModal
					isOpen={isOpen}
					modalData={modalData}
					modalType={modalType}
					closeModal={closeModal}
				/>
			</div>
		);
};

export default TeamList;
