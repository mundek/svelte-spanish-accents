import { readable, writable } from 'svelte/store';

export const wordList = writable([
    'función',
    'lingüística',
    'esdrújula',
    'albóndigas',
    'reloj'
]);
export const userResponses = writable([]);
export const totalCorrect = writable(0);
export const currentResponse = writable("");
export const questionCounter = writable(0);
export const audioIconPath = readable('images/iconfinder_volume-24_103167.png');
