import { css, throttle } from "./unit.js";
import handleOption from "./options.js";

class Animation {
	constructor(x, y, options) {
		// x, y 初始坐标修正, 使雪花不被鼠标指针遮挡
		this.position = {
			x: x - 13,
			y: y - 15
		};

		this.lifeSpan = this.originLifeSpan = options.lifeSpan;
		this.destoryScalePercent = options.destoryScalePercent;
		this.velocity = options.velocity;

		this.element = document.createElement("span");
		this.element.inert = true;
		this.element.innerHTML = options.character;
		css(this.element, {
			position: "fixed",
			top: "0",
			"pointer-events": "none",
			"z-index": "10000000",
			"font-size": options.size,
			"will-change": "transform",
			color: typeof options.color === "function" ? options.color() : options.color
		});

		this.update();
		document.body.appendChild(this.element);
	}

	update() {
		const velocity = this.velocity();
		this.position.x += velocity.x;
		this.position.y += velocity.y;
		this.lifeSpan--;

		const scalePercent = this.lifeSpan / this.originLifeSpan;

		this.element.style.transform = `translate(${this.position.x}px,${this.position.y}px) scale(${scalePercent})`;
		css(this.element, {
			transform: `translate(${this.position.x}px,${this.position.y}px) scale(${scalePercent})`,
			opacity: scalePercent
		});

		// 雪花缩放倍率小于指定倍率时销毁当前实例, 因为在值太小时，视觉上已经不可见，减少一些性能开销
		if (this.lifeSpan <= 0 || scalePercent < this.destoryScalePercent) {
			this.die();
			return;
		}

		// 递归调用, 雪花动画
		// 这里因为 requestAnimationFrame 中的函数 this 指向 window, 所以需要 bind(this) 传入 this，使 this 指向当前实例
		requestAnimationFrame(this.update.bind(this));
	}

	die() {
		this.element.remove();
	}
}

/**
 * 鼠标移动雪花特效
 * @class Mousesnow
 * @property {object} options - 配置项
 */

export default class MouseSnow {
	#options;

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
	constructor(options) {
		this.#options = handleOption(options);

		this.#bindEvents();

		if (this.#options.throttle) {
			this.#createAnimation = throttle(
				this.#originCreateAnimation.bind(this),
				this.#options.throttle
			);
		}
	}

	#originCreateAnimation(x, y, options = this.#options) {
		new Animation(x, y, options);
	}
	#createAnimation = this.#originCreateAnimation;

	#originHandlePointerMove(e) {
		// 如果是 touch 触发的 pointermove 事件，则不执行。执行原生的 touchmove 事件。
		// 因为 pointermove 在 touch 类型时，仅会触发少数几次，如果想多次触发，必须设置 touch-action: none; CSS 属性，但是这属性会影响一些默认行为，这里不能使用
		if (e.pointerType === "touch") {
			return;
		}

		if (e.touches) {
			for (let i = 0; i < e.touches.length; i++) {
				const touch = e.touches.item(i);
				this.#createAnimation(touch.clientX, touch.clientY);
			}
			return;
		}

		this.#createAnimation(e.x, e.y);
	}
	#handlePointerMove = this.#originHandlePointerMove.bind(this);

	#originHandlePointerDown(e) {
		if (!this.#options.downPointSnow.isDisabled) {
			for (let i = 0; i < this.#options.downPointSnow.num; i++) {
				this.#originCreateAnimation(e.x, e.y, {
					...this.#options,
					...this.#options.downPointSnow
				});
			}
		}
	}
	#handlePointerDown = this.#originHandlePointerDown.bind(this);

	#bindEvents() {
		const container = this.#options.container;
		// 移动事件
		container.addEventListener("pointermove", this.#handlePointerMove);
		container.addEventListener("touchmove", this.#handlePointerMove);

		// 点击事件
		container.addEventListener("pointerdown", this.#handlePointerDown);
	}

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

	get options() {
		return new Proxy(this.#options, {
			set: (target, key, value) => {
				if (key === "throttle") {
					this.#createAnimation = value
						? throttle(this.#originCreateAnimation.bind(this), value)
						: this.#originCreateAnimation;
				} else if (key === "container") {
					// 赋值新的容器时，先解绑上一个容器的事件
					target.container.removeEventListener("pointermove", this.#handlePointerMove);
					target.container.removeEventListener("touchmove", this.#handlePointerMove);
					target.container.removeEventListener("pointerdown", this.#handlePointerDown);
				}

				target[key] = value;

				// 重新绑定事件
				if (key === "container") {
					if (typeof value === "string") {
						target[key] = document.querySelector(value);
					}
					this.#bindEvents();
				}

				return true;
			}
		});
	}
}
