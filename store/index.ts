import { create } from "zustand";

import { ClubStore } from "./types";

import { persist, createJSONStorage } from "zustand/middleware";

export const useClubStore = create<ClubStore>()(
	persist(
		(set, get) => ({
			club: {
				id: "club-1",
				name: "Lincoln Cannons",
				teams: [],
			},

			addTeam: (teamName: string) => {
				set((state) => ({
					club: {
						...state.club,
						teams: [
							...state.club.teams,
							{
								id: crypto.randomUUID(),
								name: teamName,
							},
						],
					},
				}));
			},

			removeTeam: (teamId: string) => {
				set((state) => {
					const newClub = state.club.teams.filter((team) => team.id !== teamId);
					return { club: { ...state.club, teams: newClub } };
				});
			},
			getTeamById: (teamId: string) => {
				const currentState = get();
				return currentState.club.teams.find((team) => team.id === teamId);
			},
		}),
		{
			name: "Lincoln-cannons-club",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
