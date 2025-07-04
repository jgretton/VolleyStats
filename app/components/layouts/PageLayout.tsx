import React from "react";

interface PageLayoutProps {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	actions?: React.ReactNode; // For buttons like "Add Team", "Create Match", etc.
}

export const PageLayout = ({
	title,
	subtitle,
	children,
	actions,
}: PageLayoutProps) => {
	return (
		<>
			<div className="border-b border-gray-200 bg-white sticky top-0">
				<div className="px-6 py-6 sm:px-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
							{subtitle && (
								<p className="mt-1 text-sm text-gray-600">{subtitle}</p>
							)}
						</div>
						{actions && (
							<div className="flex items-center gap-3">{actions}</div>
						)}
					</div>
				</div>
			</div>

			<div className="px-6 py-6 sm:px-8">
				<div className="mx-auto max-w-7xl">{children}</div>
			</div>
		</>
	);
};
