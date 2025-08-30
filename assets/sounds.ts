
// Using short, non-intrusive sounds to avoid user fatigue.
// All sounds are royalty-free and converted to base64 Data URIs.

const hoverSound = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==';
const clickSound = 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSQAAAD//v/9/v/8//7/+/7/+v/5/vn++f/6/vj++f75/vj++v/6/vr/+v77/vv++/77/vv++/78/vz+/P/8/v3//f/9/v0AAQAEAAIAAgAAAAEAAA==';
const openSound = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRgAAABAAAcA//8EANoA7gD6APwA/AD8APkA';
const closeSound = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRgAAAD8APwA+gDqAOYA1gCEAEwA/v8EAA==';
const transitionSound = 'data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAAAAD//wABAAMABQAHAAgACgALAAwADQANAA4ADgAOAA4ADgANAA0ADQAMAAwACwAKAAkACAAHAAUAAwABAAAAAP//AAAAAAEAAwAFAAcACAAKAAwADQANAA4ADgAOAA4ADgANAA0ADQAMAAwACwAKAAkACAAHAAUAAwABAAAAAP//';


export const sounds = {
  hover: new Audio(hoverSound),
  click: new Audio(clickSound),
  open: new Audio(openSound),
  close: new Audio(closeSound),
  transition: new Audio(transitionSound),
};

export type SoundType = keyof typeof sounds;
