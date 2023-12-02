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

console.log(snow);
