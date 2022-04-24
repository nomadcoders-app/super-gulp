export const getCursorPosition = (event) => [event.clientX, event.clientY];

export const getCenterPosition = (element) => [
  element.offsetLeft + element.clientWidth / 2,
  element.offsetTop + element.clientHeight / 2,
];

export const getTransformStyle = (x, y, d, s) =>
  `translate(${x || 0}px, ${y || 0}px) rotate(${d || 0}deg) scale(${s || 1})`;
