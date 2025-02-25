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

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Algorithm Visualizer
			</h1>
			<p className="text-lg text-center mb-12">
				Explore and visualize different algorithms to understand how they work
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<h2 className="text-2xl font-semibold mb-4">Search Algorithms</h2>
					<p className="text-gray-600 mb-6">
						Explore algorithms like Linear Search, Binary Search, Depth-First
						Search, and Breadth-First Search.
					</p>
					<Link
						to="/search"
						className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
					>
						Explore Search Algorithms
					</Link>
				</div>

				<div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<h2 className="text-2xl font-semibold mb-4">Sorting Algorithms</h2>
					<p className="text-gray-600 mb-6">
						Visualize algorithms like Bubble Sort, Insertion Sort, Selection
						Sort, Merge Sort, and Quick Sort.
					</p>
					<Link
						to="/sort"
						className="block w-full bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600 transition-colors"
					>
						Explore Sorting Algorithms
					</Link>
				</div>

				<div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
					<h2 className="text-2xl font-semibold mb-4">Path Planning</h2>
					<p className="text-gray-600 mb-6">
						Coming soon: Dijkstra's Algorithm
					</p>
					<Link
						to="/path-planning"
						className="block w-full bg-purple-500 text-white text-center py-2 px-4 rounded hover:bg-purple-600 transition-colors"
					>
						Explore Path Planning
					</Link>
				</div>
			</div>

			<div className="mt-16 p-6 bg-gray-50 rounded-lg">
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
