import { readable, writable } from 'svelte/store';

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
export const wordList = writable([]);

export const masterWordList = writable([
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
    'hizo',
    'águila',
    'dieciséis',
    'trece',
    'veintidós',
    'caminar',
    'están',
    'esta',
    'está',
    'estás',
    'estas',
    'Gijón',
    'receta',
    'horario',
    'ladrón',
    'útil',
    'próximo',
    'relámpago',
    'razón',
    'dirigir',
    'tradujo',
    'escribí',
    'viví',
    'vivió',
    'bebe',
    'bebé',
    'cielo',
    'hierro',
    'veinticinco',
    'salí',
    'práctico',
    'practico',
    'practicó',
    'Ramón',
    'fui',
    'tendría',
    'estudiaré',
    'seré',
    'fueron',
    'toque',
    'toqué',
    'resiste',
    'farmacia',
    'heladería',
    'insólito',
    'gráfico',
    'esponja',
    'hirvió',
    'flaco',
    'azul',
    'marrón',
    'púrpura',
    'ejercicio',
    'inicial',
    'fonética',
    'así',
    'allá',
    'acentos'
]);
