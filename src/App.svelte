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
	<h1 style="margin: 1px 1px; padding: 1px;">
		Práctica: Los acentos escritos
	</h1>
	<Router routes={$routes}/>
	<hr/>
</div>	
