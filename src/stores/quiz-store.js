import { readable, writable } from 'svelte/store';

export const appTitle = readable('Hello Appy');
export const wordList = writable([
    'funciona',
    'función',
    'esdrújula',
    'reloj'
]);
export const userResponses = writable([]);
export const totalCorrect = writable(0);