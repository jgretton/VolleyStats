import { create } from "zustand";

import { ClubStore, Player } from "./types";

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
								players: [],
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
			addPlayerToTeam: (teamId: string, player: Omit<Player, "id">) => {
				const currentState = get();
				const currentTeamIndex = currentState.club.teams.findIndex(
					(team) => team.id === teamId
				);

				const newPlayer: Player = {
					id: crypto.randomUUID(),
					...player,
				};

				set((state) => {
					const newTeams = [...state.club.teams];
					newTeams[currentTeamIndex] = {
						...newTeams[currentTeamIndex],
						players: [...newTeams[currentTeamIndex].players, newPlayer],
					};
					return { club: { ...state.club, teams: newTeams } };
				});

				// set((state) => ({
				// 	club: {
				// 		...state.club,
				// 		teams: state.club.teams.map((team) => {
				// 			if (team.id === teamId) {
				// 				return {
				// 					...team,
				// 					players: [...team.players, newPlayer],
				// 				};
				// 			} else {
				// 				return team;
				// 			}
				// 		}),
				// 	},
				// }));
			},
			getPlayersByTeamId: (teamId: string) => {
				const currentState = get();
				const currentTeam = currentState.club.teams.find(
					(team) => team.id === teamId
				);
				if (!currentTeam) return [];
				return currentTeam.players;
			},
			removePlayerFromTeam: (teamId: string, playerId: string) => {
				set((state) => {
					const teamIndex = state.club.teams.findIndex(
						(team) => team.id === teamId
					);
					if (teamIndex === -1) return state;

					const newPlayerList = state.club.teams[teamIndex].players.filter(
						(player) => player.id !== playerId
					);

					const teams = [...state.club.teams];
					teams[teamIndex] = {
						...teams[teamIndex],
						players: newPlayerList,
					};

					return { club: { ...state.club, teams: teams } };
				});
			},
		}),
		{
			name: "Lincoln-cannons-club",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
