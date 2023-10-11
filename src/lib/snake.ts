import { onKey } from '$lib/input';

export type Position = { x: number; y: number };

export class Snake {
  public direction: Position = { x: 0, y: 0 };
  public gridSize: number;

  public array: Position[];
  public set: Set<number>;

  constructor(gridSize: number, initialPosition: Position) {
    this.gridSize = gridSize;

    this.array = [initialPosition];
    this.set = new Set([this.setIdx(initialPosition)]);

    onKey('w', () => this.up());
    onKey('a', () => this.left());
    onKey('s', () => this.down());
    onKey('d', () => this.right());
  }

  public tick(fruits: Fruits) {
    this.moveHead();

    const eaten = this.eatFruit(fruits);

    if (!eaten) {
      this.moveTail();
    }
  }

  public isOn({ x, y }: Position): boolean {
    return this.set.has(this.setIdx({ x, y }));
  }

  moveHead() {
    const newHead = {
      x: this.array[0].x + this.direction.x,
      y: this.array[0].y + this.direction.y
    };

    if (newHead.x == -1) newHead.x = this.gridSize - 1;
    if (newHead.y == -1) newHead.y = this.gridSize - 1;
    if (newHead.x == this.gridSize) newHead.x = 0;
    if (newHead.y == this.gridSize) newHead.y = 0;

    this.array.unshift(newHead);
    this.set.add(this.setIdx(newHead));
  }

  eatFruit(fruits: Fruits): boolean {
    return fruits.collide(this.array[0]);
  }

  moveTail() {
    const oldTail = this.array.pop()!;
    this.set.delete(this.setIdx(oldTail));
  }

  public up() {
    this.direction = { x: 0, y: 1 };
  }

  public down() {
    this.direction = { x: 0, y: -1 };
  }

  public left() {
    this.direction = { x: -1, y: 0 };
  }

  public right() {
    this.direction = { x: 1, y: 0 };
  }

  setIdx({ x, y }: Position): number {
    return x + y * this.gridSize;
  }
}
