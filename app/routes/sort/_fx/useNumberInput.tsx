import { useState, useEffect } from "react";

// Custom hook for handling number input
export const useNumberInput = () => {
	const [cards, setCards] = useState<number[]>([]);
	const [currentInput, setCurrentInput] = useState<string>("");
	const [cardIds, setCardIds] = useState<string[]>([]);

	useEffect(() => {
		// Function to handle keyboard events
		const handleKeyDown = (e: KeyboardEvent) => {
			// Check if the key is a number (0-9) or a comma
			if (/^[0-9]$/.test(e.key)) {
				setCurrentInput((prev) => prev + e.key);
			} else if (e.key === ",") {
				if (currentInput.trim() !== "") {
					const number = Number.parseFloat(currentInput);
					if (!Number.isNaN(number)) {
						setCards((prevCards) => [...prevCards, number]);
						setCardIds((prevIds) => [...prevIds, crypto.randomUUID()]);
					}
					setCurrentInput("");
				}
			}
		};

		// Add event listener
		document.addEventListener("keydown", handleKeyDown);

		// Clean up
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentInput]);

	return { cards, setCards, currentInput, cardIds, setCardIds };
};

export default useNumberInput;
