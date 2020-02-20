export function calculatePersonalLimit(ai, nw) {
  const choice = Math.min(ai, nw);
  const min = 2200;
  const max = 107000;

  if (choice < max) {
    return Math.max(min, choice * 0.05);
  } else {
    return choice * 0.1 >= max ? max : choice * 0.1;
  }
}
