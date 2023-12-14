/* eslint-disable no-undef */
// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			"process.env": env,
		},
		plugins: [react(), compression()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
			host: true,
			strictPort: false,
			port: process.env.PORT || 5173
		},
	};
});
