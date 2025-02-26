export function meta() {
	return [
		{ title: "Path Planning Algorithms" },
		{
			name: "description",
			content: "Visualize and learn about path planning algorithms",
		},
	];
}

export default function PathPlanning() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Path Planning Algorithms</h1>

			<div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
				<p className="text-yellow-700">
					<strong>Coming Soon:</strong> This feature is currently under
					development. Path planning algorithms like A*, Dijkstra's, and RRT
					will be implemented in future updates.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="border rounded-lg p-6 shadow-sm">
					<h2 className="text-xl font-semibold mb-3">Dijkstra's Algorithm</h2>
					<p className="text-gray-600 mb-4">
						Dijkstra's algorithm finds the shortest path between nodes in a
						graph. It can be used to find the shortest path from a starting node
						to all other nodes in the graph.
					</p>
					<div className="text-sm text-gray-500">
						<p>
							<strong>Time Complexity:</strong> O(V²) or O(E log V) with
							priority queue
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
