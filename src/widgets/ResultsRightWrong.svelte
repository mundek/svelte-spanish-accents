<script>
    import { onMount } from 'svelte';
    import { audioIconPath, longWords } from '../stores/quiz-store.js';

    export let aQuizNumber;
    export let aQuizResponse;

    onMount (() => {
        window.responsiveVoice.cancel();
    });

    function playNumber(event) {
        // console.table(event.target);
        let aNumber = event.target.value;
        if(parseInt(aNumber) >= 0) {
            if($longWords[aNumber]) {
                window.responsiveVoice.speak(
                    $longWords[aNumber],
                    "Spanish Latin American Female");
            } else {
                window.responsiveVoice.speak(
                    String(aNumber),
                    "Spanish Latin American Female");
            }
        }
    }
</script>

<style>
    .isWrong {
        color: red;
    }
    .isRight {
        color: green;
    }
    button {
        border-radius: 3px;
        border: 1px solid #00E;
        display: inline-block;
        cursor: pointer;
        color: #ff0000;
        padding: auto;
        font-size: 16px;
        font-style: bold;
        text-align: left;
        width: 6em;
    }
</style>

{#if (aQuizNumber === aQuizResponse)}
    <button class="isRight"
            type="button"
            value={aQuizNumber}
            on:click="{playNumber}">
            <img src={$audioIconPath}
                alt="play sound" 
                width="14px" height="14px" 
            />
        {aQuizNumber}
    </button>
{:else}
    <button class="isRight"
            type="button"
            value={aQuizNumber}
            on:click="{playNumber}">
            <img src={$audioIconPath} 
                alt="play sound" 
                width="14px" height="14px" 
            />
        {aQuizNumber}
    </button>
    <button class="isWrong"
            type="button" 
            value={aQuizResponse}
            on:click="{playNumber}">
            <img src={$audioIconPath}
                alt="play sound" 
                width="14px" height="14px" 
            />
        {aQuizResponse}&midast;
    </button>
{/if}