<script>
	let aWord = "barcelo";
	let letterArray = aWord.split("");
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
	let noLtrHvr = "display: inline-block; margin: 3px; padding: 1px; font-size: 3em; color: #dddddd; background-color: #fff; cursor: pointer;";
	let ltrHvr = "display: inline-block; margin: 3px; padding: 1px; font-size: 3em; color: #222222; background-color: #ddd; cursor: pointer;";

	let hovering = false;

	function highlight(event) {
		event.target.style = ltrHvr;
	}

	function resetColor(event) {
		event.target.style = noLtrHvr;
	}

	function isAVowel(vowel) {
		if (vowel.match(/[aeiou]/g)) {
			return true;
		}
		return false;
	}

	function clearAccents() {
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
		if(addAccentHash[aVowel]) {
			clearAccents();
			event.target.textContent = addAccentHash[aVowel];
		} else {
			event.target.textContent = removeAccentHash[aVowel];
		}
	}
</script>

<style>
	.container {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: fit-content(1em);
	}
	/*	.letterHover not compiled into svelte app; both .letterHover and .letterNoHover
		styled here to provide for initial CSS-based styling and, in the case of .letterHover,
		a reference definition for the script-controled styling
	*/
	.letterHover {
		display: inline-block;
		margin: 3px;
		padding: 1px;
		font-size: 3em;
		color: #222222;
		background-color: #ddd;
		cursor: pointer;
	}
	/*	.letterHover not compiled into svelte app; styled here to provide for initial 
		CSS-based styling

		TODO(?): Grab initial CSS styling in 
	*/
	.letterNoHover {
		display: inline-block;
		margin: 3px;
		padding: 1px;
		font-size: 3em;
		color: #dddddd;
		background-color: #fff;
		cursor: pointer;
	}
</style>

<div class="container">
	{#each letterArray as aLetter, i}
		{#if isAVowel(aLetter)}
			<div class={hovering ? 'letterHover' : 'letterNoHover'}
				bind:this={thisLetter}
				on:mouseover|stopPropagation="{() => hovering = true}"
				on:mouseout|stopPropagation="{() => hovering = false}"
				on:click|stopPropagation="{toggleAccent}">
					{aLetter}
			</div>
		{:else}
			<div class="letterNoHover">{aLetter}</div>
		{/if}
	{/each}
</div>
