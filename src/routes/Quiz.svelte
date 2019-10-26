<script>
    import { onMount, tick } from 'svelte';
    import { replace } from 'svelte-spa-router';

	import Word from '../widgets/spanishWord.svelte';

    import {
        wordList,
        currentWord,
        questionCounter,
        currentResponse,
        userResponses,
        totalCorrect,
        audioIconPath
    } from '../stores/quiz-store.js';
    // console.log($wordList);

    let percentageCorrect = 0;

    $: if ($questionCounter > 0) {
        percentageCorrect = (Number.parseInt(($totalCorrect / $questionCounter) * 100));
        }

    $: $currentWord = $wordList[$questionCounter];

    $: if ($questionCounter) {
        console.log('Quiz.svelte - $questionCounter binding');
        sayCurrentWord();
    }

    onMount(() => {
        // console.log('Quiz.svelte - onMount()');
        // get things started by saying the first number when component mounts
        sayCurrentWord();
    });

    function sayCurrentWord() {
        if($currentWord) {
            window.responsiveVoice.speak(
                $currentWord,
                "Spanish Latin American Female");
        }
    }

    async function submitAnswer(event) {
        // console.log('submitAnswer');

        // evaluate user's response against correct answer
        if($currentResponse === $currentWord) {
            $totalCorrect++;
        }
        // record user's response for post-quiz results output
        $userResponses[$questionCounter] = $currentResponse;

        // clear $currentResponse and $currentWord and 'await' update of DOM
        $currentResponse = '';
        $currentWord = '';
        await tick();

        // update $questionCounter after DOM update to ensure clean update of new Word (spanishWord.svelete); Word subcomponent is internally bound to $questionCounter updates
        $questionCounter++;

        // check for end of quiz; re-route to Results.svelte when finished
        if($wordList.length > $questionCounter) {
            sayCurrentWord();
        } else {
            presentResults();
        }
    }

    function presentResults() {
        // use function imported from svelte-spa-router to navigate to the results component path
        replace("/results");
    }
</script>

<style>
    .playSound {
        border-radius: 3px;
        border: 1px solid #00E;
        cursor: pointer;
        color: #ff0000;
        padding: auto;
        justify-self: end;
    }

    .submitButton, .endQuiz {
        border-radius: 3px;
        border: 1px solid #00E;
        display: inline-block;
        cursor: pointer;
        color: #ff0000;
        padding: auto;
    }

    .wordContainer {
		display: grid;
		grid-auto-columns: fit-content(1em);
		grid-auto-flow: column;
        justify-content: center;
		background-color:#3333ff;
		margin: 13px 1px;
	}
</style>

{#if $currentWord}
    <form on:submit|preventDefault="{submitAnswer}">
        <h3 style="margin: 1px 1px; padding: 1px;">
            Correctly indicate the written accent of the word, if any
        </h3>

        <!-- Debugging output -->
        <!-- <p>
            currentWord: <span style="color: #ff0000;">{$currentWord}</span> | 
            currentResponse: <span style="color: #6666ff;">{$currentResponse}</span>
        </p> -->

        <div class="wordContainer">
            <!-- Word component imports necessary quiz-store.js data itself; binds to $questionCounter from quiz-store.js to update to current word-->
            <Word />
        </div>
        <button class="playSound"
            type="button" 
            on:click="{sayCurrentWord}">
            <img src={$audioIconPath} 
                alt="play sound" 
                width="20px" height="20px" 
            />
        </button>
        <button class="submitButton"
            type="submit"
            on:submit="{submitAnswer}">
            Check
        </button>
                <button class="endQuiz"
            type="button"
            on:click="{presentResults}">
            End
        </button>
    </form>
{:else}
    <h1>QUIZ</h1>
    <h3>Error: No word!</h3>
{/if}
<p>&#x02A79; {$totalCorrect} correct ({percentageCorrect}%) &#x029BF; {$wordList.length - $questionCounter} of {$wordList.length} remaining &#x02A7A;</p>
