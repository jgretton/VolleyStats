"use client";
import React from "react";
import { Button } from "../ultils/button";
import { useClubStore } from "@/store";

export const SetCurrentSeason = ({
	seasonId,
	onSave,
}: {
	seasonId: string;
	onSave: () => void;
}) => {
	const { setCurrentSeason } = useClubStore();
	const handleConfirm = () => {
		if (!seasonId) return;
		setCurrentSeason(seasonId);
		onSave();
	};
	return (
		<div>
			<Button
				className="w-full text-center justify-center"
				type="button"
				variant="primary"
				size="md"
				onClick={handleConfirm}
				icon={false}
			>
				Update
			</Button>
		</div>
	);
};
