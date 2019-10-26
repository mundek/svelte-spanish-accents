<script>
    import {removeAccentedVowels, toggleAccent, isAnyVowel} from '../utils/spanish-vowels.js';
	import {
		currentWord,
		currentResponse
	} from '../stores/quiz-store.js';

    // set $currentResponse to unaccented version of word whenever $currentWord is updated
    $:  $currentResponse = $currentWord.split("").map(function(letter) {
            return removeAccentedVowels(letter);
            }).join('');

    let theLetters = [];
	$:  theLetters = $currentWord.split("").map(function(letter) {
		return removeAccentedVowels(letter);
        });

    function toggleLetter(event) {
        // get a reference to the character when mouse was clicked
        let aLetter = event.target.innerText;
         // get DOM references to all elements of class interactiveLetter and iterate over array and clear all accents
        document.querySelectorAll(".interactiveLetter").forEach(element => {
            element.innerText = removeAccentedVowels(element.innerText)
        });
        // toggle character between accented/unaccented states
        event.target.innerText = toggleAccent(aLetter);

        // temp String for updated accentuation of word
        let newWord = '';
        // get DOM references to all elements of class anyLetter and iterate over array to build newWord
        document.querySelectorAll(".anyLetter").forEach(element => {
            newWord = newWord + element.innerText;
        });
        // update store $currentResponse
        $currentResponse = newWord;
        // console.log($currentWord == $currentResponse);
    }
</script>

<style>
	.letterContainer {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 2.5em;
		align-items: center;
		justify-items: center;
        color: white;
	}

    .interactiveLetter {
        cursor: pointer;
    }

    .plainLetter {
        cursor: default;
    }

    .anyLetter {
        font-size: 3em;
        margin: 0.1em 0.1em;
        padding: 0.1em 0.1em;
        user-select: none;
        font-weight: bolder;
    }

    p {
        color: #ffffff; 
        background-color: #000000;
        font-weight: bolder;
        padding: 1px 6px;
        margin: 0px;
    }
</style>

<div>
</div>
<div class="letterContainer">
	{#each theLetters as aLetter}
        {#if (isAnyVowel(aLetter))}
            <div class="interactiveLetter anyLetter"
                on:click="{toggleLetter}">
                {aLetter}
            </div>
        {:else}
            <div class="plainLetter anyLetter">
                {aLetter}
            </div>
        {/if}
	{/each}
</div>
