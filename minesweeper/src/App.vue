<script setup>
import Game_Over from './components/Game_Over.vue';
import Load_Stage from './components/Load_Stage.vue';
import Main_Menu from './components/Main_Menu.vue';
import Play_Zone from './components/Play_Zone.vue';
import { useGameStore } from './store/game';
const game = useGameStore();

</script>
<template>
  <div class="flex flex-col justify-center items-center gap-4 p-2 min-h-screen w-full" @click = 'game.playSoundMenu'>

    <p v-if="!game.isstart && !game.showstageinfo && !game.isgameover"
      class="marquee absolute top-0 whitespace-nowrap text-lg font-bold p-2">
      Press Window To Play Epic Song!!!
    </p>

    <p class="text-3xl font-bold" :class="{ 'animate-bounce animate-infinite': game.showstageinfo || !game.isstart }">Minesweeper 2.0</p>

    <Main_Menu />
    <Game_Over  v-if ="game.isgameover && !game.isstart "/>
    <Load_Stage/>
    <Play_Zone v-if="game.isstart && !game.showstageinfo" />

  </div>
</template>
