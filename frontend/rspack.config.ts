import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import * as path from 'node:path';
// import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
// plugin_react_refresh_1.default is not a constructor
const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
		alias: {
			"@": path.join(__dirname, "src")
		}
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: {
									"@tailwindcss/postcss": {},
									autoprefixer: {},
								},
							},
						},
					},
				],
				type: "css",
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: false // isDev, 需要使用 ReactRefreshPlugin
									}
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		TanStackRouterRspack({ target: 'react', autoCodeSplitting: true }),
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		// isDev && new ReactRefreshPlugin()
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		css: true
	}
});
