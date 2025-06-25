import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navigation/NavBar";
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
			<body className={`antialiased`}>
				<div className="">
					<NavBar />
				</div>
				<main className="mt-10">{children}</main>
			</body>
		</html>
	);
}
