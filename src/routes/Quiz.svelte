<script>
    import { onMount } from 'svelte';
    import { replace } from 'svelte-spa-router';

	import Word from '../widgets/Word.svelte';

    import { 
        appTitle,
        wordList,
        userResponses,
        totalCorrect,
        audioIconPath
    } from '../stores/quiz-store.js';

    let currentResponse = "";
    let questionCounter = 0;
    let percentageCorrect = 0;

    $: if (questionCounter > 0) {
        percentageCorrect = (Number.parseInt(($totalCorrect / questionCounter) * 100));
        } else {
        percentageCorrect = '0';
        }

    // $numberList[0] = 911; // Responsive voice literally says "nueve uno uno" for the number '911'!

    onMount(() => {
        // get things started by saying the first number when component mounts
        sayCurrentWord();
    });

    function sayCurrentWord() {
        if($wordList[questionCounter]) {
            window.responsiveVoice.speak(
                $wordList[questionCounter],
                "Spanish Latin American Female");
        }
    }

    function validateInput() {
        if(currentResponse) {
            return true;
        } else {
            return false;
        }
    }

    function submitAnswer(event) {
        if (!validateInput()) { return false; }

        if(event.key === 'Enter' || event.type === "submit") {
            if(currentResponse === $wordList[questionCounter]) {
                $totalCorrect++;
            }
            $userResponses[questionCounter] = currentResponse;
            console.log($wordList.length, questionCounter);
            questionCounter++;
            currentResponse = '';

            if($wordList.length > questionCounter) {
                sayCurrentWord();
            } else {
                presentResults();
            }
        }
    }

    function presentResults() {
        // use function imported from svelte-spa-router
        // to navigate to the results component path
        replace("/results");
    }
</script>

<style>
    .playSound, .submitButton, .endQuiz {
        border-radius: 3px;
        border: 1px solid #00E;
        display: inline-block;
        cursor: pointer;
        color: #ff0000;
        padding: auto;
    }
</style>

{#if $wordList}
    <form on:submit|preventDefault="{submitAnswer}">
        <h3>Correctly indicate the written accent of the word, if any</h3>
        <button class="playSound"
            type="button" 
            on:click="{sayCurrentWord}">
            <img src={$audioIconPath} 
                alt="play sound" 
                width="20px" height="20px" 
            />
        </button>
        <Word aWord={$wordList[questionCounter]}/>
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
    <h3>Error: No number list!</h3>
{/if}
<p>{$totalCorrect} correct ({percentageCorrect}%)</p>
<p>{$wordList.length - questionCounter} of {$wordList.length} remaining</p>