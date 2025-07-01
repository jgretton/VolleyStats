import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "delete";
	size?: "sm" | "md" | "lg";
	type?: "submit" | "button";
	disabled?: boolean;
	className?: string;
	icon?: boolean;
}

export const Button = ({
	children,
	onClick,
	variant = "primary",
	size = "md",
	type = "button",
	disabled = false,
	className = "",
	icon = true,
}: ButtonProps) => {
	const baseClasses =
		"inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed";

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const variantClasses = {
		primary:
			"bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
		secondary:
			"bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
		delete:
			"bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
	};

	const isDelete = variant === "delete";
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
		>
			{icon ? (
				isDelete ? (
					<TrashIcon className="size-6" />
				) : (
					<PlusIcon className="size-6" />
				)
			) : null}
			{children}
		</button>
	);
};
