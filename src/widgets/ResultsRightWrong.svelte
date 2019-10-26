<script>
    import { audioIconPath } from '../stores/quiz-store.js';

    export let aQuizWord;
    export let aQuizResponse;

    function playWord(event) {
        // console.table(event.target);
        // console.log(event.target.innerText);
        let aWord = event.target.value;
        if(aWord) {
            window.responsiveVoice.speak(
                    aWord,
                    "Spanish Latin American Female");
        }
    }
</script>

<style>
    .isWrong {
        color: red;
        cursor: default;
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
        font-size: 20px;
        font-style: bold;
        text-align: left;
        width: 12em;
    }
</style>

{#if (aQuizWord === aQuizResponse)}
    <button class="isRight"
            type="button"
            value={aQuizWord}
            on:click="{playWord}">
            <img src={$audioIconPath}
                alt="play sound" 
                width="14px" height="14px" 
            />
        {aQuizWord}
    </button>
{:else}
    <button class="isRight"
            type="button"
            value={aQuizWord}
            on:click="{playWord}">
            <img src={$audioIconPath} 
                alt="play sound" 
                width="14px" height="14px" 
            />
        {aQuizWord}
    </button>
    <button class="isWrong" type="button" disabled>
        {aQuizResponse}&midast;
    </button>
{/if}