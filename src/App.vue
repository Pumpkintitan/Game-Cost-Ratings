<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <a href="/">
      <img src="/W.png" alt="logo" />
    </a>
  </header>
  <div class="contatiner">
    <RouterView />
  </div>
  <footer>
    <p>
      Games generated from
      <a href="https://seblague.github.io/ideagenerator/" target="_blank"
        >Sebastian Lague's Game Idea Generator</a
      >
    </p>
    <p>
      Made by
      <a href="https://enricoblackwell.com/" target="_blank"
        >Enrico Blackwell</a
      >
    </p>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  font-size: 18px;
  bottom: 0;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background-color: #184e77;
  color: #f26419;
  width: 100%;
}

a {
  color: #f26419;
}

.contatiner {
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

p {
  margin: 0;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 95px;
}

img {
  padding: 10px;
  width: 75px;
  height: 75px;
}
</style>
