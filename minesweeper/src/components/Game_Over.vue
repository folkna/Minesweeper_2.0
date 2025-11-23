<script setup>
import { useGameStore } from '../store/game';

const game = useGameStore();
</script>

<template>
    <p class = "text-lg font-semibold">Game Over!</p>
    <p class = "text-md font-semibold">your scores : {{game.score}}</p>
    <button class = "p-4 bg-yellow-500 hover:bg-yellow-600 cursor-pointer duration-300 shadow-lg rounded-md text-lg font-bold" @click = 'game.restartGame'>Restart ?</button>
</template>