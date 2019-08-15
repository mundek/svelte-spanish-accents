import { readable, writable } from 'svelte/store';

export appTitle = readable('Hello Appy');
export wordList = writable([
    'función',
    'esdrújula',
    'reloj'
]);
