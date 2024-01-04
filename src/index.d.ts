declare module "mousesnow" {
	/**
	 * 鼠标移动雪花特效
	 * @class Mousesnow
	 * @property {object} options - 配置项
	 */

	export default class Mousesnow {
		/**
		 * @constructor
		 * @param {object} options - 配置项
		 * @param {string} [options.color] - 颜色, 默认会在 #000000 ~ #ffffff 之间随机生成
		 * @param {string} [options.size] - 大小, 默认为 20px
		 * @param {string} [options.character] - 雪花字符，默认为 *
		 * @param {number} [options.lifeSpan] - 生命周期，默认为 120 帧
		 * @param {number} [options.destoryScalePercent] - 雪花缩放倍率小于该值时销毁，默认为 0.2
		 * @param {string|HTMLElement} [options.container] - 容器，默认为 document
		 * @param {number} [options.throttle] - 节流时间，默认为 60ms
		 * @param {function():{x:number, y:number}} [options.velocity] - 雪花速度，默认为x在 -1 ~ 1 之间随机，y 为 1
		 * @param {boolean|object} [options.downPointSnow] - 是否开启鼠标点击雪花特效，默认为 true，如果为 true，则使用默认配置，如果为 false，则不开启
		 * @param {boolean} [options.downPointSnow.isDisabled] - 是否禁用，默认为 false
		 * @param {number} [options.downPointSnow.num] - 雪花数量，默认为 20 个
		 * @param {string} [options.downPointSnow.character] - 雪花字符，默认为 *
		 * @param {string} [options.downPointSnow.size] - 大小，默认为 32px
		 * @param {number} [options.downPointSnow.lifeSpan] - 生命周期，默认为 80 帧
		 * @param {number} [options.downPointSnow.destoryScalePercent] - 雪花缩放倍率小于该值时销毁，默认为 0.3
		 * @param {function():{x:number, y:number}} [options.downPointSnow.velocity] - 雪花速度，默认为 x 和 y 在 -2 ~ 2 之间随机
		 */

		constructor(options: {
			color?: string | (() => string);
			size?: string;
			character?: string;
			lifeSpan?: number;
			destoryScalePercent?: number;
			container?: string | HTMLElement;
			throttle?: number;
			velocity?: () => { x: number; y: number };
			downPointSnow?:
				| boolean
				| {
						isDisabled?: boolean;
						num?: number;
						character?: string;
						size?: string;
						lifeSpan?: number;
						destoryScalePercent?: number;
						velocity?: () => { x: number; y: number };
				  };
		});

		/**
		 * @type {object} options - 配置项
		 * @property {string} options.color - 颜色
		 * @property {string} options.size - 大小
		 * @property {string} options.character - 雪花字符
		 * @property {number} options.lifeSpan - 生命周期
		 * @property {number} options.destoryScalePercent - 雪花缩放倍率小于该值时销毁
		 * @property {string|HTMLElement} options.container - 容器
		 * @property {number} options.throttle - 节流时间
		 * @property {function():{x:number, y:number}} options.velocity - 雪花速度
		 * @property {boolean|object} [options.downPointSnow] - 是否开启鼠标点击雪花特效，默认为 true，如果为 true，则使用默认配置，如果为 false，则不开启
		 * @property {boolean} [options.downPointSnow.isDisabled] - 是否禁用，默认为 false
		 * @property {number} [options.downPointSnow.num] - 雪花数量，默认为 20 个
		 * @property {string} [options.downPointSnow.character] - 雪花字符，默认为 *
		 * @property {string} [options.downPointSnow.size] - 大小，默认为 32px
		 * @property {number} [options.downPointSnow.lifeSpan] - 生命周期，默认为 80 帧
		 * @property {number} [options.downPointSnow.destoryScalePercent] - 雪花缩放倍率小于该值时销毁，默认为 0.3
		 * @property {function():{x:number, y:number}} [options.downPointSnow.velocity] - 雪花速度，默认为 x 和 y 在 -2 ~ 2 之间随机
		 */

		get options(): {
			color: string | (() => string);
			size: string;
			character: string;
			lifeSpan: number;
			destoryScalePercent: number;
			container: string | HTMLElement;
			throttle: number;
			velocity: () => { x: number; y: number };
			downPointSnow:
				| boolean
				| {
						isDisabled?: boolean;
						num?: number;
						character?: string;
						size?: string;
						lifeSpan?: number;
						destoryScalePercent?: number;
						velocity?: () => { x: number; y: number };
				  };
		};
	}
}
