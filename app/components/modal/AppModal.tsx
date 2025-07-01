import React from "react";
import Modal from "./Modal";
import { AddPlayerForm } from "../forms/AddPlayerForm";
import EditPlayerForm from "../forms/EditPlayerForm";
import { AddTeamForm } from "../forms/AddTeamForm";
import { EditTeamForms } from "../forms/EditTeamForms";
import { AddSeasonForm } from "../forms/AddSeasonForm";

interface AppModalProps {
	isOpen: boolean;
	modalType: string | null;
	modalData: any;
	closeModal: () => void;
}

export const AppModal = ({
	isOpen,
	modalType,
	modalData,
	closeModal,
}: AppModalProps) => {
	const getModalContent = () => {
		switch (modalType) {
			case "editPlayer":
				return (
					<EditPlayerForm
						player={modalData.player}
						teamId={modalData.teamId}
						onSave={closeModal}
					/>
				);
			case "addPlayer":
				return <AddPlayerForm teamId={modalData.teamId} onSave={closeModal} />;
			case "addTeam":
				return <AddTeamForm onSave={closeModal} />;
			case "editTeam":
				return <EditTeamForms team={modalData} onSave={closeModal} />;
			case "addSeason":
				return <AddSeasonForm seasonName={modalData} onSave={closeModal} />;
			default:
				return null;
		}
	};

	const getModalTitle = () => {
		switch (modalType) {
			case "editPlayer":
				return "Edit Player";
			case "addPlayer":
				return "Add Player";
			case "addTeam":
				return "Add Team";
			case "editTeam":
				return "Edit Team";
			case "addSeason":
				return "Create Season";
			default:
				return "";
		}
	};

	return (
		<Modal isModalOpen={isOpen} closeModal={closeModal} title={getModalTitle()}>
			{getModalContent()}
		</Modal>
	);
};
