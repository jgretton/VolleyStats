import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "./components/navigation/AppSidebar";
export const metadata: Metadata = {
	title: "Volleyball Stats",
	description: "Volleybell stats app.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased flex flex-row h-screen overflow-hidden`}>
				<AppSidebar />
				<main className=" flex-1 bg-white overflow-y-auto">{children}</main>
			</body>
		</html>
	);
}
