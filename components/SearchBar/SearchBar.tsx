"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("search") || "");

	useEffect(() => {
		setQuery(searchParams.get("search") || "");
	}, [searchParams]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedQuery = query.trim();

		if (trimmedQuery) {
			router.push(`/recipes?search=${encodeURIComponent(trimmedQuery)}`);
		} else {
			router.push("/recipes");
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.searchBox}>
			<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className={styles.input}
			/>
			<button type="submit" className={styles.button} aria-label="Search">
				<Search
					size={18}
					strokeWidth={2.5}
					className={styles.searchIcon}
				/>
			</button>
		</form>
	);
}
