import { create } from "zustand";

import { ClubStore, Player } from "./types";

import { persist, createJSONStorage } from "zustand/middleware";

export const useClubStore = create<ClubStore>()(
	persist(
		(set, get) => ({
			club: {
				id: "club-1",
				name: "Lincoln Cannons",
				currentSeasonId: "",
				teams: [],
				players: [],
				seasons: [],
				teamMemberships: [],
				matches: [],
				matchStats: [],
			},
			createSeason: (seasonName: string) => {
				const newSeason = { id: crypto.randomUUID(), name: seasonName };

				set((state) => ({
					club: {
						...state.club,
						currentSeasonId: state.club.currentSeasonId || newSeason.id, // If current season id is empty, make this the current season.
						seasons: [...state.club.seasons, newSeason],
					},
				}));
			},
			removeSeason: (seasonId: string) => {
				const currentState = get();
				const hasMatches = currentState.club.matches.some(
					(match) => match.seasonId === seasonId
				);
				const hasMemberships = currentState.club.teamMemberships.some(
					(membership) => membership.seasonId === seasonId
				);
				const isCurrentSeason = currentState.club.currentSeasonId === seasonId;

				if (hasMatches || hasMemberships) {
					throw new Error("Cannot delete season with existing data");
				} else if (isCurrentSeason) {
					throw new Error("Cannot delete season as this is the current seaon");
				} else {
					set((state) => ({
						club: {
							...state.club,
							seasons: currentState.club.seasons.filter(
								(season) => season.id !== seasonId
							),
						},
					}));
				}
			},
			updateSeasonName: (seasonName: string, seasonId: string) => {
				const currentState = get();
				const currentSeason = currentState.club.seasons.find(
					(season) => season.id === seasonId
				);

				console.log(currentSeason);
			},
			setCurrentSeason: (seasonId: string) => {
				console.log(seasonId);
				set((state) => ({
					club: { ...state.club, currentSeasonId: seasonId },
				}));
			},
			calculateMatchesPerSeason: (seasonId: string) => {
				const currentState = get();
				const matches = currentState.club.matches.filter(
					(season) => season.id === seasonId
				);
				return matches.length;
			},
			calculatePlayersPerSeason: (seasonId: string) => {
				const currentState = get();
				const players = currentState.club.players.filter(
					(season) => season.id === seasonId
				);
				return players.length;
			},
			addTeamMembership: (
				playerId: string,
				teamId: string,
				seasonId: string
			) => {
				const newMembership = {
					id: crypto.randomUUID(),
					playerId,
					teamId,
					seasonId,
					isActive: true,
				};

				set((state) => ({
					club: {
						...state.club,
						teamMemberships: [...state.club.teamMemberships, newMembership],
					},
				}));
			},
			addPlayer: (player: Omit<Player, "id">, teamId?: string) => {
				const currentState = get();

				//checking if teamid was an empty string
				const validTeamId = teamId?.trim() || undefined;

				if (validTeamId && !currentState.club.currentSeasonId) {
					throw new Error("No active season. Please create a season first.");
				}

				const newPlayer = {
					id: crypto.randomUUID(),
					name: player.name,
					number: player.number,
					position: player.position,
					isActive: !!validTeamId,
				};

				set((state) => ({
					club: {
						...state.club,
						players: [...state.club.players, newPlayer],
					},
				}));
				if (validTeamId) {
					const { addTeamMembership } = useClubStore.getState();

					addTeamMembership(
						newPlayer.id,
						validTeamId,
						currentState.club.currentSeasonId
					);
				}
			},
			getPlayerTeams: (playerId: string, seasonId?: string) => {
				const currentState = get();
				// returns all players with matching ID and is Active. SeasonID is there incase later i want to filter using a current or previous season.
				const playerMemberships = currentState.club.teamMemberships.filter(
					(membership) => {
						const matchesPlayer = membership.playerId === playerId;
						const matchesSeason = seasonId
							? membership.seasonId === seasonId
							: true;
						return matchesPlayer && matchesSeason && membership.isActive;
					}
				);

				return playerMemberships
					.map((membership) => {
						const team = currentState.club.teams.find(
							(team) => team.id === membership.teamId
						);
						return team?.name || "";
					})
					.filter((name) => name !== "");
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
			updateTeam: (teamId: string, teamName: string) => {
				set((state) => {
					const currentTeamIndex = state.club.teams.findIndex(
						(team) => team.id === teamId
					);
					const newTeam = [...state.club.teams];
					newTeam[currentTeamIndex].name = teamName;
					return { club: { ...state.club, teams: newTeam } };
				});
			},
			getTeamById: (teamId: string) => {
				const currentState = get();
				return currentState.club.teams.find((team) => team.id === teamId);
			},
			addPlayerToTeam: (
				teamId?: string,
				player: Omit<Player, "id">,
				seasonId?: string
			) => {
				// create player. If team ID is provided then create team membership
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
			updatePlayer: (teamId: string, player: Player) => {
				console.log(player);
				set((state) => {
					const currentTeamIndex = state.club.teams.findIndex(
						(team) => team.id === teamId
					);

					const currentPlayerIndex = state.club.teams[
						currentTeamIndex
					].players.findIndex((p) => p.id === player.id);

					const newTeam = [...state.club.teams];
					const currentPlayers = [...newTeam[currentTeamIndex].players];

					currentPlayers[currentPlayerIndex] = player;
					newTeam[currentTeamIndex].players = [...currentPlayers];

					return { club: { ...state.club, teams: newTeam } };
				});
			},
		}),
		{
			name: "Lincoln-cannons-club",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
