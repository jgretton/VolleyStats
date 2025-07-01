"use client";

import { useClubStore } from "@/store";
import React, { useState, useEffect } from "react";
import { Button } from "../ultils/button";

export const EditSeasonForm = ({
	seasonId,
	onSave,
}: {
	seasonId: string;
	onSave: () => void;
}) => {
	const [startYear, setStartYear] = useState<string>("");
	const [endYear, setEndYear] = useState<string>("");
	const [generatedName, setGeneratedName] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { createSeason } = useClubStore((state) => state);

	// Auto-generate season name when years change
	useEffect(() => {
		if (startYear && endYear) {
			setGeneratedName(`${startYear}/${endYear}`);
		} else {
			setGeneratedName("");
		}
	}, [startYear, endYear]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!startYear.trim() || !endYear.trim()) {
			setErrorMessage("Both start and end years are required");
			return;
		}

		const start = parseInt(startYear);
		const end = parseInt(endYear);

		if (end <= start) {
			setErrorMessage("End year must be after start year");
			return;
		}

		// You can add this validation to your store instead
		createSeason(generatedName);
		onSave();
	};

	const clearErrors = () => setErrorMessage("");
	const currentYear = new Date().getFullYear();

	return (
		<div className="space-y-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Start Year
						</label>
						<input
							type="number"
							value={startYear}
							minLength={4}
							onChange={(e) => {
								clearErrors();
								setStartYear(e.target.value);
							}}
							placeholder={currentYear.toString()}
							min="2020"
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							End Year
						</label>
						<input
							type="number"
							value={endYear}
							minLength={4}
							onChange={(e) => {
								clearErrors();
								setEndYear(e.target.value);
							}}
							placeholder={(currentYear + 1).toString()}
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						/>
					</div>
				</div>

				{/* Season Name Preview */}
				<div className="bg-gray-50 p-3 rounded-md h-16 border">
					{generatedName ? (
						<>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Season Name
							</label>
							<p className="text-sm text-gray-900 font-medium">
								{generatedName}
							</p>
						</>
					) : (
						<div className="text-gray-400 text-sm">
							Season name will appear here
						</div>
					)}
				</div>

				{/* Always reserve space for errors */}
				<div className="h-10 flex items-center">
					{errorMessage && (
						<div className="text-sm text-red-600 bg-red-50 p-2 rounded-md w-full">
							{errorMessage}
						</div>
					)}
				</div>

				<div className="flex justify-end pt-4">
					<Button variant="primary" type="submit" disabled={!generatedName}>
						Create Season
					</Button>
				</div>
			</form>
		</div>
	);
};
