<script setup>
import { useGameStore } from '../store/game'

const game = useGameStore()

</script>

<template>
    <div class="flex flex-col gap-4 p-2">
        <p class="text-lg font-bold">Stage : {{ game.stage }} / {{ game.finalstage }} </p>

        <p class="text-lg font-bold">
            Timer : <span class="inline-block w-12 text-center">{{ game.timer }}</span> s
        </p>

        <p class="text-lg font-bold">
            Score : <span class="inline-block w-16 text-center">{{ game.score }}</span>
        </p>

        <div class="flex flex-row gap-4">
            <div class="flex flex-row gap-4 items-center">
                <img src="../../img/Flag.gif">
                <p class="text-lg font-bold w-10 text-center">{{ game.flag }}</p>
            </div>

            <div class="flex flex-row gap-4 items-center">
                <img src="../../img/Checker.gif">
                <p class="text-lg font-bold w-10 text-center">{{ game.checker }}</p>
            </div>
        </div>
        <div class="flex flex-col items-center relative">
            <img :src="game.current_face" class="size-24">
            <div class="font-semibold h-6">{{ game.current_sound_text }}</div>
        </div>
        <button
            class="bg-red-500 w-full p-2 rounded-md outline-none text-white font-semibold hover:bg-red-600 cursor-pointer"
            v-if="!game.checkmode" @click="game.setCheckMode">Enter Check Mode</button>
        <button
            class="bg-gray-300 w-full p-2 rounded-md outline-none text-black font-semibold hover:bg-gray-400 cursor-pointer"
            v-else @click="game.setCheckMode">Exit Check Mode</button>
    </div>

</template>

<style scoped></style>