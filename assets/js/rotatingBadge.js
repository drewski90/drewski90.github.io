export function initRotatingBadge({
  element,
  badges,
  typeSpeed = 60,
  eraseSpeed = 40,
  holdTime = 2000
}) {
  let badgeIndex = 0;
  let charIndex = 0;
  let typing = true;

  function loop() {
    const current = badges[badgeIndex];

    if (typing) {
      element.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        typing = false;
        setTimeout(loop, holdTime);
        return;
      }
    } else {
      element.textContent = current.slice(0, charIndex--);
      if (charIndex === 0) {
        typing = true;
        badgeIndex = (badgeIndex + 1) % badges.length;
      }
    }

    setTimeout(loop, typing ? typeSpeed : eraseSpeed);
  }

  loop();
}
