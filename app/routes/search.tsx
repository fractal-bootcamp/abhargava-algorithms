import React from "react";

export function meta() {
	return [
		{ title: "Search Algorithms" },
		{
			name: "description",
			content: "Visualize and learn about search algorithms",
		},
	];
}

export default function Search() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Search Algorithms</h1>

			<div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
				<p className="text-yellow-700">
					<strong>Coming Soon:</strong> This feature is currently under
					development. Search algorithms like Linear Search, Binary Search,
					Depth-First Search, and Breadth-First Search will be implemented in
					future updates.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Linear Search</h2>
					<p className="text-gray-600 mb-4">
						Linear search is the simplest search algorithm that checks each
						element in the array sequentially until it finds the target value or
						reaches the end of the array.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(n)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1)
						</p>
						<p className="mt-2 text-blue-500">Coming Soon</p>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Binary Search</h2>
					<p className="text-gray-600 mb-4">
						Binary search is an efficient algorithm for finding an item from a
						sorted list. It works by repeatedly dividing the search interval in
						half.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(log n)
						</p>
						<p>
							<strong>Space Complexity:</strong> O(1) iterative, O(log n)
							recursive
						</p>
						<p className="mt-2 text-blue-500">Coming Soon</p>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Depth-First Search</h2>
					<p className="text-gray-600 mb-4">
						DFS is an algorithm for traversing or searching tree or graph data
						structures. It starts at a selected node and explores as far as
						possible along each branch before backtracking.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(V + E) where V is vertices and
							E is edges
						</p>
						<p>
							<strong>Space Complexity:</strong> O(V)
						</p>
						<p className="mt-2 text-blue-500">Coming Soon</p>
					</div>
				</div>

				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Breadth-First Search</h2>
					<p className="text-gray-600 mb-4">
						BFS is an algorithm for traversing or searching tree or graph data
						structures. It starts at a selected node and explores all neighbor
						nodes at the present depth before moving on to nodes at the next
						depth level.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(V + E) where V is vertices and
							E is edges
						</p>
						<p>
							<strong>Space Complexity:</strong> O(V)
						</p>
						<p className="mt-2 text-blue-500">Coming Soon</p>
					</div>
				</div>
			</div>
		</div>
	);
}
