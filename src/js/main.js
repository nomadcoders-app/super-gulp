import { getCenterPosition, getCursorPosition, getTransformStyle } from './util';

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.cursor = 'none';

  const logo = document.querySelector('#main-logo');

  const cursor = document.querySelector('.cursor');
  cursor.style.visibility = 'hidden';
  const cursorSize = 32;

  let [centerX, centerY] = getCenterPosition(logo);

  window.addEventListener('resize', () => {
    [centerX, centerY] = getCenterPosition(logo);
  });

  document.body.addEventListener('pointermove', (event) => {
    cursor.style.visibility = 'visible';
    const [x, y] = getCursorPosition(event);
    const dX = (centerX - x) / 30;
    const dY = (centerY - y) / 30;
    const hyp = Math.hypot(centerX - x, centerY - y);
    const rad = Math.atan2(centerY - y, centerX - x);
    const deg = rad * (180 / Math.PI) + 225;
    logo.style.filter = `drop-shadow(${dX}px ${dY}px 2px rgba(0 0 0 / 30%))`;
    cursor.style.transform = getTransformStyle(
      x - cursorSize / 2,
      y - cursorSize / 2,
      deg,
      0.5 + hyp / 500,
    );
  });

  document.body.addEventListener('pointerleave', () => {
    cursor.style.visibility = 'hidden';
  });
});
