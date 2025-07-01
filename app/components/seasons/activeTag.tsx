import React from "react";

export const ActiveTag = ({ isActive }: { isActive: boolean }) => {
	const variantClasses = {
		active: "bg-green-100 text-green-800 border border-green-200",
		inactive: "bg-gray-100 text-gray-600 border border-gray-200",
	};

	const variant = isActive ? "active" : "inactive";

	return (
		<span
			className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}
		>
			{isActive ? "Current" : "Past"}
		</span>
	);
};
