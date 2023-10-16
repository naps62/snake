<svelte:options accessors />

<script lang="ts">
  import { addDirection, type Position } from '$lib/utils';
  import { onKey } from '$lib/input';
  import SnakeBit from './SnakeBit.svelte';

  export let elapsed: number;
  export let width: number;
  export let scale: number;
  export let spacing: number;
  export let direction: Position = { x: 0, y: 0 };
  let previousTail: Position = { x: 0, y: 0 };

  export let array: Position[] = [{ x: 0, y: 0 }];
  export let set: Set<string> = new Set(['0,0']);
  let started = false;
  let collided = false;
  let wait = false;

  function setDirection(x: number, y: number) {
    started = true;
    if (direction.y != 0 && y != 0) return;
    if (direction.x != 0 && x != 0) return;
    if (collided || wait) return;
    wait = true;
    direction = { x, y };
  }

  onKey('w', up);
  onKey('s', down);
  onKey('a', left);
  onKey('d', right);
  onKey('ArrowUp', up);
  onKey('ArrowDown', down);
  onKey('ArrowLeft', left);
  onKey('ArrowRight', right);

  export function up() {
    setDirection(0, 1);
  }
  export function down() {
    setDirection(0, -1);
  }
  export function left() {
    setDirection(-1, 0);
  }
  export function right() {
    setDirection(1, 0);
  }

  export function len() {
    return array.length;
  }

  export function tick() {
    if (!started || collided) return;

    wait = false;

    let [wallCollision, newHead] = addDirection(array[0], direction, width);

    if (wallCollision || set.has(idx(newHead))) {
      collided = true;
      direction = { x: 0, y: 0 };
      return;
    }

    let tail = array[array.length - 1];
    previousTail = { x: tail.x, y: tail.y };
    set.add(idx(newHead));
    set.delete(idx(tail));

    array = array.map((pos) => {
      const tmp = newHead;
      newHead = pos;
      return tmp;
    });
  }

  export function collide(positions: Position[]): number {
    const { x, y } = array[0];

    const res = positions.findIndex((p) => p.x == x && p.y == y);
    if (res >= 0) grow();
    return res;
  }

  function grow() {
    array.push(previousTail);
    set.add(idx(previousTail));
  }

  function idx(p: Position): string {
    return `${p.x},${p.y}`;
  }
</script>

<!-- render each snake bit -->
{#each array as { x, y }, idx}
  <SnakeBit {scale} {spacing} {x} {y} {idx} len={array.length} {elapsed} />
{/each}
