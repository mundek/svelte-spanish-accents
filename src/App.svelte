<script>
	import { routes } from './stores/route-store.js';

	// routed components must be in the ./routes folder
	import Router from 'svelte-spa-router';
	// 'replace' function allows programatic setting of routes
	import { replace } from 'svelte-spa-router';

// // options and selected are development/debugging code
	let options = [
		{ id: '', text: `Start` },
		{ id: 'quiz', text: `Quiz` },
		{ id: 'results', text: `Results` },
		{ id: 'WRONG', text: `Bad Path` }
	];

	let selected = { id: 'quiz', text: `Quiz` };

	$: {
		replace(`/${selected.id}`);
	}
</script>

<style>

</style>

<!-- The form and select tag are development/testing code -->
<form>
	<select bind:value={selected}>
		{#each options as anOption}
			<option value={anOption}>
				{anOption.text}
			</option>
		{/each}
	</select>
</form>

<div style="width: 700px;">
	<h2>Práctica: Los acentos escritos</h2>
	<Router routes={$routes}/>
	<hr/>
</div>	
