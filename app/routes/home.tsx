import { Link } from "react-router";

export function meta() {
	return [
		{ title: "Algorithm Visualizer" },
		{
			name: "description",
			content: "Visualize and learn about various algorithms",
		},
	];
}

// Define an interface for algorithm categories
interface AlgorithmCategory {
	title: string;
	description: string;
	path: string;
	buttonText: string;
	buttonColor: string;
}

export default function Home() {
	// Define the algorithm categories data
	const algorithmCategories: AlgorithmCategory[] = [
		{
			title: "Search Algorithms",
			description:
				"Explore algorithms like Linear Search, Binary Search, Depth-First Search, and Breadth-First Search.",
			path: "/search",
			buttonText: "Explore Search Algorithms",
			buttonColor: "bg-blue-500 hover:bg-blue-600",
		},
		{
			title: "Sorting Algorithms",
			description:
				"Visualize algorithms like Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, and Quick Sort.",
			path: "/sort",
			buttonText: "Explore Sorting Algorithms",
			buttonColor: "bg-green-500 hover:bg-green-600",
		},
		{
			title: "Path Planning",
			description: "Coming soon: Dijkstra's Algorithm",
			path: "/path-planning",
			buttonText: "Explore Path Planning",
			buttonColor: "bg-purple-500 hover:bg-purple-600",
		},
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Algorithm Visualizer
			</h1>
			<p className="text-lg text-center mb-12">
				Explore and visualize different algorithms to understand how they work
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{algorithmCategories.map((category) => (
					<div
						key={category.path}
						className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
					>
						<div className="flex-grow">
							<h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
							<p className="text-gray-600 mb-6">{category.description}</p>
						</div>
						<Link
							to={category.path}
							className={`block w-full ${category.buttonColor} text-white text-center py-2 px-4 rounded transition-colors mt-auto`}
						>
							{category.buttonText}
						</Link>
					</div>
				))}
			</div>

			<div className="mt-16 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">About This Project</h2>
				<p className="mb-4">
					This algorithm visualizer is designed to help you understand how
					different algorithms work through interactive visualizations. Select
					an algorithm category above to get started.
				</p>
			</div>
		</div>
	);
}
