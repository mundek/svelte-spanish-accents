import { readable, writable } from 'svelte/store';

export const appTitle = readable('Hello Appy');
export const wordList = writable([
    'esdrújula',
    'función',
    'albóndigas',
    'reloj'
]);
export const userResponses = writable([]);
export const totalCorrect = writable(0);
export const audioIconPath = readable('images/iconfinder_volume-24_103167.png');
