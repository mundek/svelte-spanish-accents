<script>
// TODO: https://svelte.dev/tutorial/event-forwarding
// - to get events from letter component to quiz component, the word component must forward them
// - allows maintenance of current state of word (accent placement)
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { questionCounter } from '../stores/quiz-store.js';

	export let aLetter = "?";
	const initialLetter = aLetter;
	export let anId = 999;

	let addAccentHash = {
		'a': 'á',
		'e': 'é',
		'i': 'í',
		'o': 'ó',
		'u': 'ú'
	}
	let removeAccentHash = {
		'á': 'a',
		'é': 'e',
		'í': 'i',
		'ó': 'o',
		'ú': 'u'
	}
	let noLtrHvr = "display: inline-block; margin: 3px; padding: 1px; font-family: monospace; font-size: 2em; color: #dddddd; background-color: #fff; cursor: pointer;";
	let ltrHvr = "display: inline-block; margin: 3px; padding: 1px; font-family: monospace; font-size: 2em; color: #222222; background-color: #ddd; cursor: pointer;";

	let hovering = false;

	function resetColor(event) {
		event.target.style = noLtrHvr;
	}

	function isAVowel(vowel) {
		if (typeof vowel === 'string' || vowel instanceof String) {
			if (vowel.match(/[aeiou]/g)) {
				return true;
			}
		}
		return false;
	}

	function clearAccents() {
		// console.log("clearing " + aLetter);
		let allDivs = document.getElementsByTagName("div");
		let allDivsArr = [...allDivs].filter(aDiv => aDiv.className.match(/letter/g));
		allDivsArr.forEach(element => {
			if(removeAccentHash[element.textContent.trim()]) {
				element.textContent = removeAccentHash[element.textContent.trim()];
			}	
		});
	}

	function toggleAccent(event) {
		let aVowel = event.target.textContent.match(/[aáeéiíoóuú]/g);
		console.log(event.target.id);
		if(addAccentHash[aVowel]) {
			clearAccents();
			event.target.textContent = addAccentHash[aVowel];
		} else {
			event.target.textContent = removeAccentHash[aVowel];
		}
		dispatch('letterUpdate', {
			letterID: event.target.id,
			newLetter: event.target.textContent
		});
	}
</script>

<style>
	/*	.letterHover not compiled into svelte app; both .letterHover and .letterNoHover
		styled here to provide for initial CSS-based styling and, in the case of .letterHover,
		a reference definition for the script-controled styling
	*/
	.letterHover {
		display: inline-block;
		margin: 3px;
		padding: 1px;
		font-family: monospace;
		font-size: 2em;
		color: #222222;
		background-color: #ddd;
		cursor: pointer;
	}
	/*
	.letterHover not compiled into svelte app; styled here to provide for initial 
		CSS-based styling

		TODO(?): Grab initial CSS styling in 
	*/
	.letterNoHover {
		display: inline-block;
		margin: 3px;
		padding: 1px;
		font-size: 2em;
		font-family: monospace;
		color: #dddddd;
		background-color: blue;
		cursor: pointer;
	}
</style>

{#if isAVowel(aLetter)}
	<div id={anId} class={hovering ? 'letterHover' : 'letterNoHover'}
		on:mouseover|stopPropagation="{() => {
			hovering = true;
			console.log(this.id);
			}
		}"
		on:mouseout|stopPropagation="{() => hovering = false}"
		on:click|stopPropagation="{toggleAccent}">
			{aLetter}
	</div>
{:else}
	<div id={anId} class="letterNoHover">{aLetter}</div>
{/if}
