import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";

const indexFile = {
	input: "src/index.js",
	output: [
		{
			file: "dist/index.js",
			format: "iife",
			name: "MouseSnow"
		},
		{
			file: "dist/index.esm.js",
			format: "esm"
		}
	],
	plugins: [nodeResolve()]
};

const indexMinFile = {
	input: "src/index.js",
	output: [
		{
			file: "dist/index.min.js",
			format: "iife",
			name: "MouseSnow"
		}
	],
	plugins: [nodeResolve(), terser()]
};

// 打包 typescript 声明文件
const dtsFile = {
	input: "src/index.d.ts",
	output: [{ file: "dist/index.d.ts", format: "es" }],
	plugins: [dts()]
};

export default [indexFile, indexMinFile, dtsFile];
