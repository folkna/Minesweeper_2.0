<script setup>
import { useGameStore } from '../store/game';

const game = useGameStore();
</script>

<template>
    <button class = "p-4 bg-yellow-500 hover:bg-yellow-600 cursor-pointer duration-300 shadow-lg rounded-md text-lg font-bold" v-if="!game.isstart && !game.isgameover && !game.showstageinfo" @click = 'game.startGame'>Start Game!</button>
</template>