import { Player, Team } from "@/store/types";
import { ModalState } from "@/types";
import { useState } from "react";

const DEFAULT_MODALSTATE = { isOpen: false, type: null, data: null };

export const useAppModal = () => {
	const [modalState, setModalState] = useState<ModalState>(DEFAULT_MODALSTATE);

	const closeModal = (): void => {
		setModalState(DEFAULT_MODALSTATE);
	};

	const openEditPlayer = (player: Player, teamId: string): void => {
		setModalState({
			isOpen: true,
			type: "editPlayer",
			data: { player: player, teamId: teamId },
		});
	};
	const openAddPlayer = (teamId: string): void => {
		setModalState({ isOpen: true, type: "addPlayer", data: { teamId } });
	};
	const openEditTeam = (team: Team): void => {
		setModalState({ isOpen: true, type: "editTeam", data: team });
	};
	const openAddTeam = (): void => {
		setModalState({ isOpen: true, type: "addTeam", data: null });
	};

	return {
		isOpen: modalState.isOpen,
		modalType: modalState.type,
		modalData: modalState.data,
		closeModal,
		openEditPlayer,
		openAddPlayer,
		openEditTeam,
		openAddTeam,
	};
};
