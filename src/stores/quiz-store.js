import { readable, writable } from 'svelte/store';

// export const wordList = writable([
//     'función',
//     'lingüística',
//     'esdrújula',
//     'albóndigas',
//     'reloj'
// ]);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// WARNING: ResponsiveVoice pronounces "hablara" as "hablará" 
export const wordList = writable([
    'hablara',
    'hablará',
    'tomara',
    'contara',
    'hable',
    'hablé',
    'habló',
    'hablo'
]);

export const currentWord = writable('?');
export const currentResponse = writable("");
export const userResponses = writable([]);
export const questionCounter = writable(0);
export const totalCorrect = writable(0);
export const audioIconPath = readable('images/iconfinder_volume-24_103167.png');
