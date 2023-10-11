import type { Position } from './snake';

export class Fruits {
  public gridSize: number;
  public array: Position[] = [];
  public set: Set<number> = new Set();

  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.gen();
  }

  collide(p: Position): boolean {
    const res = this.set.delete(this.setIdx(p));
    if (res) {
      const idx = this.array.findIndex(({ x, y }) => x == p.x && y == p.y);
      this.array.splice(idx, 1);

      this.gen();
    }

    return res;
  }

  gen() {
    let p: Position;

    do {
      p = { x: this.rand(), y: this.rand() };
    } while (this.set.has(this.setIdx(p)));

    this.set.add(this.setIdx(p));
    this.array.push(p);
  }

  setIdx({ x, y }: Position): number {
    return x + y * this.gridSize;
  }

  rand() {
    return Math.floor(Math.random() * this.gridSize);
  }
}
