import React from "react";
import Card from "./Card";

// Component for displaying the original unsorted cards
export const UnsortedCards = ({
	cards,
	cardIds,
}: { cards: number[]; cardIds: string[] }) => {
	return (
		<>
			{cards.map((card, index) => (
				<Card
					key={cardIds[index]}
					value={card}
					className="w-12 h-14 bg-blue-500 mr-2"
				/>
			))}
		</>
	);
};

export default UnsortedCards;
