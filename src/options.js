import { randomHexColor } from "./unit.js";

export default (options) => {
	const defaultDownPointSnowOptions = {
		num: 20,
		character: "*",
		size: "32px",
		lifeSpan: 80,
		destoryScalePercent: 0.3,
		velocity() {
			this.x = this.x ?? (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2;
			this.y = this.y ?? (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2;

			return {
				x: this.x,
				y: this.y
			};
		},
		color() {
			return randomHexColor();
		}
	};

	if (options?.downPointSnow === true) {
		options.downPointSnow.num = defaultDownPointSnowOptions.num;
		options.downPointSnow.character = defaultDownPointSnowOptions.character;
		options.downPointSnow.size = defaultDownPointSnowOptions.size;
		options.downPointSnow.lifeSpan = defaultDownPointSnowOptions.lifeSpan;
		options.downPointSnow.destoryScalePercent = defaultDownPointSnowOptions.destoryScalePercent;
		options.downPointSnow.velocity = defaultDownPointSnowOptions.velocity;
		options.downPointSnow.color = defaultDownPointSnowOptions.color;
	}

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
			num: options?.downPointSnow?.num ?? defaultDownPointSnowOptions.num,
			character:
				options?.downPointSnow?.character ??
				options?.character ??
				defaultDownPointSnowOptions.character,
			size: options?.downPointSnow?.size ?? options?.size ?? defaultDownPointSnowOptions.size,
			lifeSpan:
				options?.downPointSnow?.lifeSpan ??
				options?.lifeSpan ??
				defaultDownPointSnowOptions.lifeSpan,
			destoryScalePercent:
				options?.downPointSnow?.destoryScalePercent ??
				options?.destoryScalePercent ??
				defaultDownPointSnowOptions.destoryScalePercent,
			velocity: options?.downPointSnow?.velocity ?? defaultDownPointSnowOptions.velocity,
			color:
				options?.downPointSnow?.color ?? options?.color ?? defaultDownPointSnowOptions.color
		}
	};

	if (typeof defaultOptions.container === "string") {
		defaultOptions.container = document.querySelector(defaultOptions.container);
	}

	return defaultOptions;
};
