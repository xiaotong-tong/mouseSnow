import { randomHexColor } from "./unit.js";

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
			},
		downPointSnow: {
			isDisabled: options?.downPointSnow === false,
			num: options?.downPointSnow?.num ?? 20,
			character: options?.downPointSnow?.character ?? options?.character ?? "*",
			size: options?.downPointSnow?.size ?? options?.size ?? "32px",
			lifeSpan: options?.downPointSnow?.lifeSpan ?? options?.lifeSpan ?? 80,
			destoryScalePercent: options?.downPointSnow?.destoryScalePercent ?? options?.destoryScalePercent ?? 0.3,
			velocity:
				options?.downPointSnow?.velocity ??
				function () {
					this.x = this.x ?? (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2;
					this.y = this.y ?? (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2;

					return {
						x: this.x,
						y: this.y
					};
				}
		}
	};

	if (typeof defaultOptions.container === "string") {
		defaultOptions.container = document.querySelector(defaultOptions.container);
	}

	return defaultOptions;
};
