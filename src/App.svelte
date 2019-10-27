<script>
    import { onMount } from 'svelte';

	// enable routing - routed components must be in the ./routes folder
	// Package source: https://www.npmjs.com/package/svelte-spa-router
	import Router from 'svelte-spa-router';

	// configure routing
	import { routes } from './stores/route-store.js';
	import { replace } from 'svelte-spa-router'

	// configure default route
	let selected = { id: '', text: 'Start'};

    onMount(() => {
        window.responsiveVoice.cancel();
	});

	$: {
		// 'replace' function allows programatic setting/redirection of routes
		replace(`/${selected.id}`);
	}

	// all remaining script-tag code is development/debugging code
	// let options = [
	// 	{ id: '', text: `Start` },
	// 	{ id: 'quiz', text: `Quiz` },
	// 	{ id: 'results', text: `Results` },
	// 	{ id: 'WRONG', text: `Bad Path` }
	// ];
</script>

<style>
	.footer-container {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: auto auto;
		grid-template-rows: auto;
		grid-template-areas:
			"externalCred githubLink";
		width: 700px;
	}
	.externalCred {
		grid-area: externalCred;
	}
	.githubLink {
		grid-area: githubLink;
		font-size: 20px;
        font-style: bold;
	}
	h1 {
		margin: 1px 1px;
		padding: 1px;
		background-color: #ee1111;
	}
</style>

<!-- The following form and select tags are development/testing code 
<form>
	<select bind:value={selected}>
		{#each options as anOption}
			<option value={anOption}>
				{anOption.text}
			</option>
		{/each}
	</select>
</form>
-->

<!-- App state managed with Router component-->
<div style="width: 700px;">
	<h1>Práctica: Los acentos escritos</h1>
	<Router routes={$routes}/>
	<hr/>
	<div class='footer-container'>
		<div class="externalCred">
			<div style="width:300px;vertical-align:top;font-family: Arial;font-size:9pt;line-height: normal">
				<a rel="license" href="//responsivevoice.org/" target="_blank"><img alt="ResponsiveVoice Text To Speech image" title="ResponsiveVoice Text To Speech" src="https://responsivevoice.org/wp-content/uploads/2014/08/120x31.png" style="float:left;padding-right:2px" /></a><span xmlns:dct="https://purl.org/dc/terms/" property="dct:title"><a href="//responsivevoice.org/" target="_blank" title="ResponsiveVoice Text To Speech">ResponsiveVoice</a></span> used under <a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" alt="Creative Commons License and Link" title="Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License">Non-Commercial License</a>
			</div>
		</div>
		<div style="clear: both;">&nbsp;</div>
		<div class="githubLink">
			<a href="https://github.com/mundek/svelte-spanish-accents" target="_blank">svelte-spanish-accents on github <i class="github icon"></i></a>
		</div>
	</div>
</div>	
