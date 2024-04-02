<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="title">What would you pay?</div>
    Let us know what you would pay for these video games
    <RouterLink to="/vote/132532423423423"
      ><button class="primary">Start</button></RouterLink
    >
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  color: #f7c59f;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.title {
  font-size: 60px;
  color: #f7c59f;
  font-weight: 600;
}
.primary {
  transition: 0.3s;
  background-color: #1a659e;
  color: #ff6b35;
  border: 1px solid #ff6b35;
  border-radius: 4px;
  font-size: 30px;
  padding: 18px 24px;
}
.primary:hover {
  transition: 0.3s;
  background-color: #ff6b35;
  color: #1a659e;
}
</style>
