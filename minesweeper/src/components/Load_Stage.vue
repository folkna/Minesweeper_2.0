<script setup>
import { useGameStore } from '../store/game';

const game = useGameStore()
</script>

<template>
    <div v-if="game.showstageinfo" class = "text-center p-4 bg-gray-200 rounded-md">
        <p class="text-xl font-bold">Stage {{ game.stage }} / 3</p>
    </div>
</template>