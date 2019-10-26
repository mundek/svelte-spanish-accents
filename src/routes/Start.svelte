<script>
	// configure routing
	// import { routes } from '../stores/route-store.js';

	// 'replace' function allows programatic setting of routes
	import { replace } from 'svelte-spa-router';

    function startQuiz() {
    //  use svelte-spa-router 'replace' method to navigate to quiz component
        replace("/quiz");
    }
</script>

<style>

</style>

<form>
    <div class="container">
        <div class="start">
            <button on:click|preventDefault="{startQuiz}">Start Quiz</button>
        </div>    
    </div>
</form>

