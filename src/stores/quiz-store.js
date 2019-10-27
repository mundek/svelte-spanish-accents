import { readable, writable } from 'svelte/store';

export const wordList = writable([
    'almuerzo',
    'camino', 
    'función',
    'lingüística',
    'habló',
    'acciones',
    'fácil',
    'esdrújula',
    'almorzó',
    'albóndigas',
]);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// WARNING: ResponsiveVoice pronounces "hablara" as "hablará" 
// WHAT ELSE does it get wrong?
//
// export const wordList = writable([
//     'hablara',
//     'hablará',
//     'tomara',
//     'contara',
//     'hable',
//     'hablé',
//     'habló',
//     'hablo'
// ]);

export const currentWord = writable('?');
export const currentResponse = writable("");
export const userResponses = writable([]);
export const questionCounter = writable(0);
export const totalCorrect = writable(0);
export const audioIconPath = readable('images/iconfinder_volume-24_103167.png');
