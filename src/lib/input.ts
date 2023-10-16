type Listeners = Array<() => void>;
const listeners: Map<string, Listeners> = new Map();

export function onKey(key: string, callback: () => void): number {
	if (!listeners.has(key)) {
		listeners.set(key, []);
	}

	const list = listeners.get(key)!;
	list.push(callback);

	return list.length - 1;
}

export function unKey(key: string, id: number) {
	const list = listeners.get(key);
	if (!list) return;
	list.splice(id, 1);
}

function handleKeyDown(e: KeyboardEvent) {
	const list = listeners.get(e.key);
	if (!list) return;
	list.forEach((callback) => callback());
}

export function init() {
	document.addEventListener('keydown', handleKeyDown);
}

export function destroy() {}
