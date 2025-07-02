"use client";

import { PageLayout } from "@/app/components/layouts/PageLayout";
import { AppModal } from "@/app/components/modal/AppModal";
import PlayerTable from "@/app/components/players/PlayerTable";
import { Button } from "@/app/components/ultils/button";
import { useAppModal } from "@/hooks/useAppModal";
import { useClubStore } from "@/store";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

const Page = () => {
	const { club } = useClubStore();
	const { isOpen, modalType, modalData, closeModal, openAddPlayer } =
		useAppModal();
	const handleAddPlayer = () => {
		openAddPlayer();
	};

	return (
		<PageLayout
			title="Players"
			subtitle="Management for all of the clubs players"
			actions={
				<Button onClick={handleAddPlayer} variant="primary" icon>
					Add Player
				</Button>
			}
		>
			<div className="size-full">
				{club.players.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<UserGroupIcon className="h-12 w-12 text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No Players created yet
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-20">
						<PlayerTable players={club.players} />
					</div>
				)}
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
