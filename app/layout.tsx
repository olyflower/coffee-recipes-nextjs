import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Balsamiq_Sans } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
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

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="uk">
			<body className={`${balsamiq.variable}`}>
				<SessionProviderWrapper>
					<main>{children}</main>
					<Footer />
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
