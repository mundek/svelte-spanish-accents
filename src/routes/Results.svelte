<script>
    import { replace } from 'svelte-spa-router';
    // import ResultsRightWrong from '../widgets/ResultsRightWrong.svelte';

    import {
        wordList,
        userResponses,
        totalCorrect
    } from '../stores/quiz-store.js';
    console.table($userResponses);

    // $: columnCount = Math.ceil(Number.parseInt($numberList.length) / 10);

    // /* 
    //     // pre-filled lists for debugging
    //     // $LISTLISTLIST = ['práctico', 'practico', 'practicó']
    //     // $userResponses = ['práctico', 'practicó', 'practicó']
    // */
    // function restartQuiz() {
    //     replace("/");
    // }
</script>

<style>
    /* h3 {
        padding-left: 10px;
        padding-bottom: 10px;
        margin: 0;
        padding-block: 0;
        color: white;
        background-color: #777;
    }
    ul {
        list-style: none;
        margin:0;
        padding:0;
    }
    ul > li {
    display: inline-block;
    width: 100%;
    }
    li {
        display: inline-block;
        width: 100%;
    }
    div {
        column-gap: 15px;
    }
    .restartButton {
        margin-left: auto;
        display: block;
    } */
</style>

<h1>Results.svelte</h1>
<!--
<h3>RESULTS: {Number.parseInt(($totalCorrect/$numberList.length) * 100)}% correct 
    <span style="color: #d8d8d8;">({$totalCorrect} of {$numberList.length})</span>
</h3>
<div style="column-count: {columnCount}; columns: {columnCount};">
    <ul>
    {#each $numberList as aNumber, i}
        <li><ResultsRightWrong 
                aQuizNumber={aNumber} 
                aQuizResponse={$userResponses[i]} 
            /></li>
    {/each}
    </ul>
</div>
<button class="restartButton"
    type="button"
    on:click="{restartQuiz}">Restart</button>
-->