<script>
    import { onMount } from 'svelte';
    import { replace } from 'svelte-spa-router';

	import Word from '../widgets/spanishWord.svelte';

    import {
        wordList,
        currentResponse,
        questionCounter,
        userResponses,
        totalCorrect,
        audioIconPath
    } from '../stores/quiz-store.js';
    // console.log($wordList);

    let percentageCorrect = 0;
    let wordVisible = true;

    $: if ($questionCounter > 0) {
        percentageCorrect = (Number.parseInt(($totalCorrect / $questionCounter) * 100));
        } else {
        percentageCorrect = '0';
        }

    $: displayedWord = $wordList[$questionCounter];

    // $numberList[0] = 911; // Responsive voice literally says "nueve uno uno" for the number '911'!

    onMount(() => {
        // get things started by saying the first number when component mounts
        sayCurrentWord();
    });

    function sayCurrentWord() {
        if($wordList[$questionCounter]) {
            window.responsiveVoice.speak(
                $wordList[$questionCounter],
                "Spanish Latin American Female");
        }
    }

    function submitAnswer(event) {
        console.log('submitAnswer');
        console.log($currentResponse == $wordList[$questionCounter]);
        // console.table(Word);
        if(event.key === 'Enter' || event.type === "submit") {
            if($currentResponse === $wordList[$questionCounter]) {
                $totalCorrect++;
            }
            $userResponses[$questionCounter] = $currentResponse;
            $questionCounter++;
            $currentResponse = '';
            wordVisible = false;
            console.log($wordList.length, $questionCounter);

            if($wordList.length > $questionCounter) {
                sayCurrentWord();
                wordVisible = true;
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
		background-color: blue;
		margin: 13px 1px;
	}
</style>

{#if wordVisible}
    {#if displayedWord}
        <form on:submit|preventDefault="{submitAnswer}">
            <h3 style="margin: 1px 1px; padding: 1px;">
                Correctly indicate the written accent of the word, if any [{$wordList[$questionCounter]}]
            </h3>
            <div class="wordContainer">
                <Word word={displayedWord}/>
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
        <h3>Error: No number list!</h3>
    {/if}
{:else}
<h1>????????</h1>
{/if}
<p>{$totalCorrect} correct ({percentageCorrect}%)</p>
<p>{$wordList.length - $questionCounter} of {$wordList.length} remaining</p>