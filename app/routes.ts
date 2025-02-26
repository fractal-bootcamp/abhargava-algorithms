import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
	route("search", "routes/search.tsx"),
	route("sort", "routes/sort.tsx"),
	...prefix("sort", [
		route("quick", "routes/sort/quick.tsx"),
	]),
	route("path-planning", "routes/path-planning.tsx"),
] satisfies RouteConfig;
