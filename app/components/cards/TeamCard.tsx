"use client";

import { useClubStore } from "@/store";
import { Team } from "@/store/types";
import {
	PencilSquareIcon,
	TrashIcon,
	EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { AppModal } from "../modal/AppModal";
import { useAppModal } from "@/hooks/useAppModal";

export const TeamCard = ({ team }: { team: Team }) => {
	const { isOpen, modalData, modalType, closeModal, openEditTeam } =
		useAppModal();
	const { removeTeam, updateTeam } = useClubStore();
	return (
		<div className="bg-gray-50 p-5 rounded-lg shadow-sm max-w-md w-full">
			<div className="flex flex-row w-full">
				<h2 className="text-lg font-medium flex-1">{team.name}</h2>
				<details className="relative rounded-md">
					<summary className="appearance-none list-none hover:bg-gray-100 cursor-pointer [&::-webkit-details-marker]:hidden">
						<EllipsisVerticalIcon className="size-6 text-gray-600" />
					</summary>
					<ul className="flex flex-col gap-5 bg-white rounded-lg shadow-sm absolute right-0 w-fit px-2 py-4">
						<li className="w-full">
							<button
								className="cursor-pointer hover:bg-gray-100 w-full px-4 py-1 inline-flex items-center gap-2"
								onClick={() => removeTeam(team.id)}
							>
								<TrashIcon className="size-5 text-red-500" /> Delete
							</button>
						</li>
						<li className="w-full">
							<button
								className="cursor-pointer hover:bg-gray-100 w-full px-4 py-1 inline-flex items-center gap-2"
								onClick={() => openEditTeam(team)}
							>
								<PencilSquareIcon className="size-5 text-gray-800" />
								Edit
							</button>
						</li>
					</ul>
				</details>
			</div>
			<div className="mt-3">
				<p className="">
					No of players :{" "}
					<span className="font font-medium">{team.players.length}</span>
				</p>

				<div className="w-full text-right mt-10">
					<Link className="text-right" href={`/teams/${team.id}`}>
						View
					</Link>
				</div>
			</div>
			<AppModal
				modalData={modalData}
				modalType={modalType}
				isOpen={isOpen}
				closeModal={closeModal}
			/>
		</div>
	);
};
