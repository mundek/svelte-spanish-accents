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

	function highlight(event) {
		let aVowel = event.target.textContent.match(/[aeiou]/g);
		event.target.style = ltrHvr;
	}

	function resetColor(event) {
		let aVowel = event.target.textContent.match(/[áéíóú]/g);
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
	.letterHover {
		display: inline-block;
		margin: 3px;
		padding: 1px;
		font-size: 3em;
		color: #222222;
		background-color: #ddd;
		cursor: pointer;
	}
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
			<div class="letterNoHover"
				on:mouseover|stopPropagation={highlight}
				on:mouseout|stopPropagation={resetColor}
				on:click|stopPropagation={toggleAccent}>
					{aLetter}
			</div>
		{:else}
			<div class="letterNoHover">{aLetter}</div>
		{/if}
	{/each}
</div>
