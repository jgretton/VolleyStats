"use client";

import { PageLayout } from "@/app/components/layouts/PageLayout";
import { AppModal } from "@/app/components/modal/AppModal";
import TeamTable from "@/app/components/team/TeamTable";
import { Button } from "@/app/components/ultils/button";
import { useAppModal } from "@/hooks/useAppModal";
import { useClubStore } from "@/store";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

const Page = () => {
	const { club } = useClubStore();
	const { isOpen, modalData, modalType, closeModal, openAddTeam } =
		useAppModal();
	return (
		<PageLayout
			title="Team Management"
			subtitle="Manage your teams"
			actions={
				<Button size="md" type="button" onClick={() => openAddTeam()}>
					Add Team
				</Button>
			}
		>
			<div className="size-full">
				{club.teams.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<UserGroupIcon className="h-12 w-12 text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No Teams created yet.
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-20">
						<TeamTable teams={club.teams} />
					</div>
				)}
			</div>

			<AppModal
				isOpen={isOpen}
				modalData={modalData}
				modalType={modalType}
				closeModal={closeModal}
			/>
		</PageLayout>
	);
};

export default Page;
