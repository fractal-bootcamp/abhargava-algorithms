import React from "react";

// Card component for displaying a number
export const Card = ({
	value,
	className,
}: { value: number; className: string }) => (
	<div
		className={`flex-shrink-0 text-white rounded-md shadow-md flex items-center justify-center text-xl font-bold ${className}`}
	>
		{value}
	</div>
);

export default Card;
