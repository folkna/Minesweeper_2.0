<script setup>
import { useGameStore } from '../store/game';

const game = useGameStore();

function checkbomb(row, col) {
  game.checkBomb(row, col)
}

function setflag(row, col) {
  game.setFlag(row, col)
}

function usechecker(row, col) {
  game.useChecker(row, col)
}
</script>

<template>
  <div v-for="(row, i) in game.board" :key="i" class="flex flex-row w-full">
    <div v-for="(cell, j) in row" :key="j" class="flex-1 aspect-square border border-gray-200">
      <div class="flex items-center justify-center w-full h-full transition-transform duration-300 cursor-pointer"
        :class="{
          'bg-red-500 hover:bg-red-600 animate-jump animate-once': !game.isshow_board[i][j] && game.color[i][j] === 'R',
          'bg-green-500 hover:bg-green-600 animate-jump animate-once': !game.isshow_board[i][j] && game.color[i][j] === 'G',
          'bg-gray-400 hover:bg-gray-500 scale-100': !game.isshow_board[i][j],
          'bg-gray-100 animate-jump animate-once': game.isshow_board[i][j] && cell !== 'B',
          'bg-gray-100': game.isshow_board[i][j] && cell === 'B'
        }" @click="game.checkmode ? usechecker(i, j) : checkbomb(i, j)" @contextmenu.prevent="setflag(i, j)">

        <img v-if="game.isshow_flag[i][j]" src="../../img/Flag.gif" class="w-6 h-6" />
        <span v-if="game.isshow_board[i][j] && cell !== 'B'">{{ cell }}</span>
        <div v-if="game.isshow_board[i][j] && cell === 'B'" class="rounded-full bg-black w-4 h-4"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>