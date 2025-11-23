<script setup>
import { useGameStore } from "../store/game";
import Boom_Field from "./Boom_Field.vue";
import Detail_Game from "./Detail_Game.vue";

const game = useGameStore();
</script>

<template>
  <div class="flex flex-col items-center md:flex-row md:justify-center w-4/5 lg:w-1/2 gap-4 mb-10">
    <div class="flex flex-col bg-gray-300 rounded-md shadow-lg w-full lg:w-2/5 p-2" @contextmenu.prevent>
      <Boom_Field />
    </div>
    <Detail_Game />
  </div>
  <p class="text-lg font-semibold animate-wiggle animate-infinite duration-300 h-6">
    {{ game.checkmode ? "Click a block to check for bombs!" : " " }}
  </p>
</template>

<style></style>