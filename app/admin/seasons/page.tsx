"use client";

import { PageLayout } from "@/app/components/layouts/PageLayout";
import { Button } from "@/app/components/ultils/button";
import React from "react";

import { useClubStore } from "@/store";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { AppModal } from "@/app/components/modal/AppModal";
import { useAppModal } from "@/hooks/useAppModal";
import { SeasonTable } from "@/app/components/seasons/SeasonTable";

const Page = () => {
	const { club } = useClubStore((state) => state);
	const { isOpen, modalType, modalData, closeModal, openAddSeason } =
		useAppModal();
	const handleAddSeason = () => {
		openAddSeason();
	};
	return (
		<PageLayout
			title="Seasons"
			subtitle="Manage the club seasons."
			actions={
				<Button onClick={handleAddSeason} variant="primary">
					Add Season
				</Button>
			}
		>
			<div className="size-full">
				{club.seasons.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No seasons created yet
						</p>
						<p className="text-gray-400 text-sm mt-2 max-w-sm">
							Create your first season to start tracking matches and stats.
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-20">
						<SeasonTable seasonData={club.seasons} />
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
