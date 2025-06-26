"use client";

import { Team } from "@/store/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

export const TeamCard = ({ team }: { team: Team }) => {
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
	return (
		<div className="bg-gray-50 p-5 rounded-lg shadow-sm max-w-md w-full">
			<div className="flex flex-row w-full">
				<h2 className="text-lg font-medium flex-1">{team.name}</h2>
				<button
					className="cursor-pointer hover:bg-gray-100 rounded-md relative"
					onClick={() => setMenuIsOpen(!menuIsOpen)}
				>
					<EllipsisVerticalIcon className="size-6 text-gray-600" />
					<div
						className={`${
							menuIsOpen ? "flex" : "hidden"
						} flex-col gap-2 bg-white py-4 rounded-md shadow-sm p-1 absolute right-0`}
					>
						<button className="mx-2">Delete</button>
						<hr />
						<button className="mx-2">Edit</button>
					</div>
				</button>
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
		</div>
	);
};
