import { useClubStore } from "@/store";
import { Player } from "@/store/types";
import { useState } from "react";

export const useMatchSetup = (matchId: string) => {
	const { updateMatchSelectedPlayers, getSelectedPlayersFromMatchId, club } =
		useClubStore();
	const [selectedPlayers, setSelectedPlayers] = useState<Player[]>(
		getSelectedPlayersFromMatchId(matchId)
	);
	const [confirmedSquad, setConfirmedSquad] = useState<boolean>(
		club.matches.find((match) => match.id === matchId)?.confirmedSquad || false
	);

	const confirmSelectedPlayers = () => {
		if (selectedPlayers.length < 6)
			throw new Error("The squad needs to have a minimum of 6 players");
		setConfirmedSquad(true);
		updateMatchSelectedPlayers(matchId, selectedPlayers);
	};

	return {
		selectedPlayers,
		setSelectedPlayers,
		confirmedSquad,
		setConfirmedSquad,
		confirmSelectedPlayers,
	};
};
