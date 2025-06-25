"use client";
import { AppModal } from "../components/modal/AppModal";
import TeamList from "../components/team/TeamList";
import { useAppModal } from "@/hooks/useAppModal";

export default function Page() {
	const { closeModal, modalData, modalType, openAddTeam, isOpen } =
		useAppModal();
	return (
		<div className="">
			<button
				type="button"
				className="mx-4 px-4 py-3 text-white bg-blue-400 rounded-lg cursor-pointer"
				onClick={() => openAddTeam()}
			>
				+ Add New Team
			</button>
			<TeamList />

			<AppModal
				closeModal={closeModal}
				modalData={modalData}
				modalType={modalType}
				isOpen={isOpen}
			/>
		</div>
	);
}
