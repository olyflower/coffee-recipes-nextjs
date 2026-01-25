import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "./globals.css";

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	weight: ["400", "700", "800"],
});

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://coffee-recipes-nextjs.vercel.app"),
	alternates: {
		canonical: "/",
	},
	title: "Coffee Recipes | Classic & Unique Brews",
	description:
		"Website with coffee recipes for coffee lovers. Classic and unique recipes, step-by-step instructions.",
	keywords: [
		"best coffee recipes",
		"how to brew coffee at home",
		"barista secrets",
		"espresso guide",
		"coffee making tips",
	],
	icons: {
		icon: "/icon.svg",
		apple: "/icon.svg",
	},
	openGraph: {
		title: "Coffee Recipes | Classic & Unique Brews",
		description: "Step-by-step coffee brewing guide.",
		type: "website",
		url: "https://coffee-recipes-nextjs.vercel.app",
	},
};

export const viewport = {
	themeColor: "#2c1810",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={`${playfair.variable} ${montserrat.variable}`}
		>
			<body className={montserrat.className}>
				<SessionProviderWrapper>
					<main>{children}</main>
					<Footer />
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
