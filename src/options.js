import { randomHexColor } from "xtt-utils";

export default (options) => {
	const defaultOptions = {
		color:
			options?.color ??
			function () {
				return randomHexColor();
			},
		size: options?.size ?? "20px",
		character: options?.character ?? "*",
		lifeSpan: options?.lifeSpan ?? 120,
		destoryScalePercent: options?.destoryScalePercent ?? 0.2,
		container: options?.container ?? document,
		throttle: options?.throttle ?? 60,
		velocity:
			options?.velocity ??
			function () {
				return {
					x: (Math.random() < 0.5 ? -1 : 1) * Math.random(),
					y: 1
				};
			}
	};

	if (typeof defaultOptions.container === "string") {
		defaultOptions.container = document.querySelector(defaultOptions.container);
	}

	return defaultOptions;
};
