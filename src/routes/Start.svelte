<script>
    import { onMount } from 'svelte';

    import {
        currentWord,
        questionCounter,
        currentResponse,
        userResponses,
        totalCorrect
    } from '../stores/quiz-store.js';

	// 'replace' function allows programatic setting of routes
	import { replace } from 'svelte-spa-router';

    onMount(() => {
        // console.log('onMount() - Start.svelte');
        // get things started by resetting control-related data in quiz-store.js
        $currentWord = '';
        $questionCounter = 0;
        $currentResponse = '';
        $userResponses = [];
        $totalCorrect = 0;
    });

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

