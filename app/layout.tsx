import type { Metadata } from "next";
import { Balsamiq_Sans } from "next/font/google";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const balsamiq = Balsamiq_Sans({
	subsets: ["latin"],
	weight: ["400", "700"], 
	variable: "--font-balsamiq",
});

export const metadata: Metadata = {
	title: "Кавові рецепти",
	description:
		"Сайт з кавовими рецептами для любителів кави. Класичні та унікальні рецепти, покрокові інструкції.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="uk">
			<body className={`${balsamiq.variable}`}>
				<Navbar />
				<main>{children}</main>
				<Footer/>
			</body>
		</html>
	);
}
