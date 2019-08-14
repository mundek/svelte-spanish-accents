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
	
	// console.log(letterArray);

	function highlight(event) {
		//console.table(event.target);
		let aVowel = event.target.textContent.match(/[aeiou]/g);
		// if(aVowel) {
		// 	event.target.textContent = addAccentHash[aVowel];
		// }
		// event.target.classList.toggle("letterHover");
		event.target.style = ltrHvr;
	}

	function resetColor(event) {
		// console.table(event);
		let aVowel = event.target.textContent.match(/[áéíóú]/g);
		// if(aVowel) {
		// 	event.target.textContent = removeAccentHash[aVowel];
		// }
		event.target.style = noLtrHvr;
		// event.target.classList.toggle("letterHover");
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
		// console.table(allDivs);
		allDivsArr.forEach((element, i) => {
			// console.log("i: " + i + " - " + element.textContent + " - letter?: " + (element.className.match(/letter/g)));
			console.log("element.textContent: " + element.textContent + " - " + addAccentHash[element.textContent.trim()]);
			if(removeAccentHash[element.textContent.trim()]) {
				element.textContent = removeAccentHash[element.textContent.trim()];
			}	
		});
	}

	function toggleAccent(event) {
		let charIndex = Number.parseInt(event.target.id);
		let aVowel = event.target.textContent.match(/[aáeéiíoóuú]/g);
		console.log("togAcc: " + event.target.textContent + "-addAccentHash[aVowel]: " + addAccentHash[aVowel]);
		if(addAccentHash[aVowel]) {
			clearAccents();
			console.log(charIndex, aVowel, addAccentHash[aVowel], removeAccentHash[aVowel]);
			event.target.textContent = addAccentHash[aVowel];
			// aWord = aWord.slice(0, charIndex) + addAccentHash[aVowel] + aWord.slice(charIndex + 1);
		} else {
			console.log(charIndex, aVowel, addAccentHash[aVowel], removeAccentHash[aVowel]);
			event.target.textContent = removeAccentHash[aVowel];
			// aWord = aWord.slice(0, charIndex) + removeAccentHash[aVowel] + aWord.slice(charIndex + 1);
		}
		// console.log(aWord);
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
				id={`${i}letter`} 
				on:mouseover|stopPropagation={highlight}
				on:mouseout|stopPropagation={resetColor}
				on:click|stopPropagation={toggleAccent}>
					{aLetter}
			</div>
		{:else}
			<div class="letterNoHover"
				id={`${i}letter`} 
				on:mouseover|stopPropagation={highlight}
				on:mouseout|stopPropagation={resetColor}>
					{aLetter}
			</div>
		{/if}
	{/each}
</div>
