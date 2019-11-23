<script>
    import { onMount, tick } from 'svelte';
    import { replace } from 'svelte-spa-router';

    import Word from '../widgets/spanishWord.svelte';

    import {
        wordList,
        masterWordList,
        currentWord,
        questionCounter,
        currentResponse,
        userResponses,
        totalCorrect,
        audioIconPath
    } from '../stores/quiz-store.js';

    let percentageCorrect = 0;
    let flashValue = "progressDisplayContainer";
    randomizeWordList(10);

    $: if ($questionCounter > 0) {
        percentageCorrect = (Number.parseInt(($totalCorrect / $questionCounter) * 100));
        }

    $: $currentWord = $wordList[$questionCounter];

    $: if ($questionCounter) {
        sayCurrentWord();
    }

    onMount(() => {
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

    function randomizeWordList(listLength) {
        // local newArray avoids changing original array, which will have been passed as a reference
        let newArray = $masterWordList.slice();
        // Array randomization code from https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
        for(let i = newArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;
        }
        $wordList = newArray.slice(0, listLength);
    }

    async function submitAnswer(event) {
        // console.log('submitAnswer');

        // evaluate user's response against correct answer
        if($currentResponse === $currentWord) {
            $totalCorrect++;
            flashValue = "progressDisplayContainerCorrect";
            await tick();
        } else {
            flashValue = "progressDisplayContainerWrong";
            await tick();
        }
        setTimeout(function(){ 
                flashValue = "progressDisplayContainer";
        }, 2000);

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
        <div class="quizContainer">
            <div class="wordContainer">
                <!-- Word component imports necessary quiz-store.js data itself; binds to $questionCounter from quiz-store.js to update to current word-->
                <Word />
            </div>
            <div class="controlButtons">
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
            </div>
            <div id="{flashValue}">
                <div class="progressDisplay">
                    <span id="shiny">&ltcir; </span>
                    {$totalCorrect} correct ({percentageCorrect}%) 
                    <span id="shiny"> &twixt; </span>
                    {$wordList.length - $questionCounter} of {$wordList.length} remaining
                    <span id="shiny"> &gtcir;</span>
                </div>
            </div>
        </div>
    </form>
{:else}
    <h1>QUIZ</h1>
    <h3>Error: No word!</h3>
{/if}

<style>
    .playSound {
        border-radius: 3px;
        border: 1px solid #00E;
        cursor: pointer;
        color: #ee1111;
        padding: auto;
        justify-self: end;
    }

    .submitButton, .endQuiz {
        border-radius: 3px;
        border: 1px solid #00E;
        display: inline-block;
        cursor: pointer;
        color: #ee1111;
        padding: auto;
    }
    .quizContainer {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas:
            "wordContainer"
            "controlButtons"
            "progressDisplay";
    }
    .controlButtons { 
        grid-area: controlButtons;
        justify-self: center;
        margin: 4px 0px;
    }
    .progressDisplay {
        grid-area: progressDisplay;
        justify-self: center;
        margin: 4px 0px;
    }
    .wordContainer {
        grid-area: wordContainer;
		display: grid;
		grid-auto-columns: fit-content(1em);
		grid-auto-flow: column;
        justify-content: center;
		background-color:#3333ff;
		margin: 13px 1px;
	}

    /* The animation code */

    /* The basic style of the animated elements */
    #progressDisplayContainer {
        background-color: white;
        animation-name: none;
        justify-self: center;
        font-weight: 400;
    }
    #shiny {
        justify-self: center;
        font-weight: 400;
        animation-name: theshining;
        animation-duration: 3s;
        animation-iteration-count: infinite;

    }

    /* keyframes and alt styles for (in)correct responses */
    @keyframes correctAnswer {
        0%   {background-color: transparent;}
        50%  {background-color: green;}
        100%  {background-color: transparent;}
    }
    #progressDisplayContainerCorrect {
        justify-self: center;
        background-color: transparent;
        animation-name: correctAnswer;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
    @keyframes wrongAnswer {
        0%   {background-color: transparent;}
        50%  {background-color:red;}
        100%  {background-color: transparent;}
    }
    #progressDisplayContainerWrong {
        justify-self: center;
        background-color: transparent;
        animation-name: wrongAnswer;;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
    @keyframes theshining {
        0%   {color: white;}
        12%   {color: blue;}
        25%   {color: green;}
        37%   {color: red;}
        50%   {color: black;}
        63%   {color: red;}
        75%   {color: green;}
        88%   {color: blue;}
        100%   {color: white;}
    }
</style>
