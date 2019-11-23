<script>
    import { onMount } from 'svelte';

    import {
        wordList,
        currentWord,
        questionCounter,
        currentResponse,
        userResponses,
        totalCorrect
    } from '../stores/quiz-store.js';

	// 'replace' function allows programatic setting of routes
	import { replace } from 'svelte-spa-router';

    onMount(() => {
        window.responsiveVoice.cancel();
        // get things started by resetting control-related data in quiz-store.js
        $wordList = [];
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

<form>
    <div class="container">
        <p></p>
        <p></p>
        <div class="start" align="center">
            <button on:click|preventDefault="{startQuiz}">Start Quiz</button>
        </div>
        <p></p>
        <p></p>
    </div>
</form>


<style>
    button {
        border-radius: 12px;
        border: 3px solid #00E;
        display: inline-block;
        cursor: pointer;
        color: #ff0000;
        padding: auto;
        font-size: 24px;
        font-style: bold;
        text-align: center;
        width: 12em;
    }
</style>
