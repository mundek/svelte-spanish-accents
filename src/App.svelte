<script>
	// routed components must be in the ./routes folder
	import Router from 'svelte-spa-router';

	// configure routing
	import { routes } from './stores/route-store.js';

	// 'replace' function allows programatic setting of routes
	import { replace } from 'svelte-spa-router';

	let selected = { id: 'quiz', text: `Quiz` };

	$: {
		replace(`/${selected.id}`);
	}

	// all following code is development/debugging code
	// let options = [
	// 	{ id: '', text: `Start` },
	// 	{ id: 'quiz', text: `Quiz` },
	// 	{ id: 'results', text: `Results` },
	// 	{ id: 'WRONG', text: `Bad Path` }
	// ];
	</script>

<style>

</style>

<!-- The form and select tag are development/testing code 
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
</div>	
