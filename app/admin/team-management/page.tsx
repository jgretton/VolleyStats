"use client";

import { PageLayout } from "@/app/components/layouts/PageLayout";
import TeamTable from "@/app/components/team/TeamTable";
import { useClubStore } from "@/store";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

const Page = () => {
	const { club } = useClubStore();
	return (
		<PageLayout title="Team Management" subtitle="Manage your teams" actions>
			<div className="size-full">
				{club.teams.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<UserGroupIcon className="h-12 w-12 text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg font-medium">
							No Teams created yet.
						</p>
					</div>
				) : (
					<div className="flex flex-col gap-20">
						<TeamTable teams={club.teams} />
					</div>
				)}
			</div>
		</PageLayout>
	);
};

export default Page;
