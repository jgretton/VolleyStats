"use client";

import { useAppModal } from "@/hooks/useAppModal";
import { PageLayout } from "../components/layouts/PageLayout";
import TeamList from "../components/team/TeamList";
import { Button } from "../components/ultils/button";
import { AppModal } from "../components/modal/AppModal";

export default function Page() {
	const { isOpen, modalData, modalType, closeModal, openAddTeam } =
		useAppModal();
	return (
		<PageLayout
			title="Teams"
			subtitle="View your list of teams and see their stats in more details"
			actions={
				<Button size="md" type="button" onClick={() => openAddTeam()}>
					Add Team
				</Button>
			}
		>
			<TeamList />

			<AppModal
				isOpen={isOpen}
				modalData={modalData}
				modalType={modalType}
				closeModal={closeModal}
			/>
		</PageLayout>
	);
}
