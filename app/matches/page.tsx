"use client";
import React from "react";
import { PageLayout } from "../components/layouts/PageLayout";
import { Button } from "../components/ultils/button";
import { useAppModal } from "@/hooks/useAppModal";
import { AppModal } from "../components/modal/AppModal";

const Page = () => {
	const { isOpen, modalType, modalData, closeModal, openCreateMatch } =
		useAppModal();
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
			<div className="size-full"></div>
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
