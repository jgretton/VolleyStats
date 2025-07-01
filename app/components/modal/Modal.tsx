import React, { useEffect, useRef } from "react";

const Modal = ({
	title,
	isModalOpen,
	children,
	closeModal,
}: {
	title: string;
	isModalOpen: boolean;
	closeModal: () => void;
	children: React.ReactNode;
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isModalOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}

		const handleClose = () => {
			closeModal();
		};

		dialog.addEventListener("close", handleClose);

		return () => {
			dialog.removeEventListener("close", handleClose);
		};
	}, [isModalOpen, closeModal]);

	return (
		<dialog
			ref={dialogRef}
			className="max-w-lg backdrop:bg-gray-900/50 rounded-md w-full m-auto"
		>
			<div className="p-5 rounded-md w-full mx-auto bg-white">
				<h2 className="font-bold capitalize text-lg text-center">{title}</h2>
				<div className="mt-4">{children}</div>

				<button
					onClick={closeModal}
					className="mt-4 px-4 py-2 border hover:bg-gray-200 border-gray-200 bg-white text-black rounded cursor-pointer w-full"
				>
					Cancel
				</button>
			</div>
		</dialog>
	);
};

export default Modal;
