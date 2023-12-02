const random = (min, max) => {
	return min + Math.floor(Math.random() * (max - min + 1));
};

export const randomHexColor = () => {
	return "#" + random(0, 0xffffff).toString(16).padStart(6, "0");
};

export const css = (element, styles, value) => {
	if (element?.nodeType !== Node.ELEMENT_NODE) {
		throw new TypeError("element is not a ELEMENT_NODE");
	}

	if (typeof styles === "object") {
		for (const key in styles) {
			if (Object.hasOwnProperty.call(styles, key)) {
				element.style.setProperty(key, styles[key]);
			}
		}
	} else if (typeof styles === "string") {
		if (value === undefined) {
			return element.style.getPropertyValue(styles) || getComputedStyle(element).getPropertyValue(styles);
		} else {
			element.style.setProperty(styles, value);
		}
	}

	return element;
};

export const throttle = (func, delay) => {
	let lastArgs = null;
	let isWaiting = false;

	const res = (...args) => {
		if (!isWaiting) {
			isWaiting = true;
			func(...args);
			setTimeout(() => {
				isWaiting = false;
				if (lastArgs !== null) {
					const lastArgsCopy = lastArgs;
					lastArgs = null;
					res(...lastArgsCopy);
				}
			}, delay);
		} else {
			lastArgs = args;
		}
	};

	return res;
};
