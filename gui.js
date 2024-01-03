import MouseSnow from "./src/index.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";
const snow = new MouseSnow();

const gui = new GUI();

const obj = {
	color: "",
	throttle: 60,
	lifeSpan: 120,
	destoryScalePercent: 0.2,
	character: "*",
	size: 20,
	containterToBox: false,
	velocity: {
		x: 0,
		y: 1
	},
	downPointSnow: {
		isDisabled: false,
		num: 20,
		character: "*",
		size: 32,
		lifeSpan: 80,
		destoryScalePercent: 0.3,
		velocity: {
			x: 0,
			y: 1
		},
		color: ""
	}
};

gui.addColor(obj, "color").onChange((value) => {
	snow.options.color = value;
});
gui.add(obj, "throttle", 0).onChange((value) => {
	snow.options.throttle = value;
});
gui.add(obj, "lifeSpan", 0).onChange((value) => {
	snow.options.lifeSpan = value;
});
gui.add(obj, "destoryScalePercent", 0, 1).onChange((value) => {
	snow.options.destoryScalePercent = value;
});
gui.add(obj, "character").onChange((value) => {
	snow.options.character = value;
});
gui.add(obj, "size", 0).onChange((value) => {
	snow.options.size = value + "px";
});
gui.add(obj, "containterToBox").onChange((value) => {
	if (value) {
		snow.options.container = "#box";
	} else {
		snow.options.container = document;
	}
});

const velocity = gui.addFolder("velocity");
velocity.add(obj.velocity, "x", -5, 5).onChange((value) => {
	snow.options.velocity = function () {
		return obj.velocity;
	};
});
velocity.add(obj.velocity, "y", -5, 5).onChange((value) => {
	snow.options.velocity = function () {
		return obj.velocity;
	};
});

const downPointSnow = gui.addFolder("downPointSnow");
downPointSnow.add(obj.downPointSnow, "isDisabled").onChange((value) => {
	snow.options.downPointSnow.isDisabled = value;
});
downPointSnow.add(obj.downPointSnow, "num", 0).onChange((value) => {
	snow.options.downPointSnow.num = value;
});
downPointSnow.add(obj.downPointSnow, "character").onChange((value) => {
	snow.options.downPointSnow.character = value;
});
downPointSnow.add(obj.downPointSnow, "size", 0).onChange((value) => {
	snow.options.downPointSnow.size = value + "px";
});
downPointSnow.add(obj.downPointSnow, "lifeSpan", 0).onChange((value) => {
	snow.options.downPointSnow.lifeSpan = value;
});
downPointSnow.add(obj.downPointSnow, "destoryScalePercent", 0, 1).onChange((value) => {
	snow.options.downPointSnow.destoryScalePercent = value;
});
downPointSnow.addColor(obj.downPointSnow, "color").onChange((value) => {
	snow.options.downPointSnow.color = value;
});

console.log(snow);
