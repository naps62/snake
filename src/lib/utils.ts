export type Position = { x: number; y: number };

export function addDirection(p: Position, dir: Position, width: number): [boolean, Position] {
  const res = {
    x: p.x + dir.x,
    y: p.y + dir.y
  };
  let collision = false;

  const min = Math.ceil(-width / 2);
  const max = Math.floor(width / 2);

  if (res.x > max || res.x < min || res.y > max || res.y < min) collision = true;

  return [collision, res];
}

export function setIdx({ x, y }: Position): string {
  return `${x},${y}`;
}

export function interpolateQuadraticEaseOut(start: number, end: number, t: number) {
  t = Math.min(1, Math.max(0, t)); // Clamp t to [0, 1]
  const easedT = quadraticEaseOut(t);
  return start + (end - start) * easedT;
}

function quadraticEaseOut(t: number) {
  return 1 - (1 - t) * (1 - t);
}
