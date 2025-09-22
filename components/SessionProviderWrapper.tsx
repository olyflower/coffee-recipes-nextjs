"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/NavBar/NavBar";

export default function SessionProviderWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<SessionProvider>
			<Navbar />
			{children}
		</SessionProvider>
	);
}
