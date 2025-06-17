<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const price = ref('');
const loading = ref(false);
const route = useRoute();
const router = useRouter();
const prompt = ref<any>(null);
const error = ref(null);
const submitted = ref(false);
const results = ref<any>(null);

watch(price, (newPrice) => {
  if (newPrice === '') return;

  const numericPrice = Number(newPrice);
  if (numericPrice > 100) {
    price.value = '100';
  } else if (numericPrice < 0) {
    price.value = '0';
  }
});

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id: string | string[]) {
  prompt.value = null;
  loading.value = true;
  price.value = '';
  submitted.value = false;
  results.value = null;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/prompt/${route.params.id}`
    );
    const data = await response.json();
    prompt.value = data.rows[0].gameprompt;
  } catch (err: any) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function postData() {
  loading.value = true;
  try {
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/postPrice`, {
      method: 'POST',
      body: JSON.stringify({
        id: route.params.id,
        price: Number(price.value),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    submitted.value = true;
    await fetchResults();
  } catch (err: any) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function fetchResults() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/result/${route.params.id}`
    );
    const data = await response.json();
    results.value = data;
  } catch (err: any) {
    error.value = err.toString();
  }
}

function goToNextPrompt() {
  router.push(`/vote/${Math.ceil(Math.random() * 100)}`);
}
</script>

<template>
  <main>
    <div class="title">What would you pay for...</div>
    <div class="game" v-if="prompt">
      {{ prompt }}
    </div>
    <div class="pricebar" v-if="!submitted">
      $<input
        type="number"
        v-model="price"
        placeholder="0"
        :disabled="submitted"
      />&nbsp;
      <button class="primary" @click="postData" v-if="!submitted">
        Submit
      </button>
    </div>
    <p v-if="!submitted">Choose a price between $0 - $100</p>
    <div v-if="submitted && results" class="results">
      <h3>Results:</h3>
      <div><strong>Your Price:</strong> ${{ Number(price).toFixed(2) }}</div>
      <div>
        <strong>Average Price:</strong> ${{
          (
            results.ratings.reduce((a: number, b: number) => a + b) /
            results.ratings.length
          ).toFixed(2)
        }}
      </div>
      <div><strong>Total Votes:</strong> {{ results.ratings.length }}</div>
    </div>

    <button class="primary" @click="goToNextPrompt" v-if="submitted">
      Next
    </button>
  </main>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.title {
  font-size: 60px;
  color: #f7c59f;
  font-weight: 600;
}
.game {
  font-size: 40px;
  color: #f7c59f;
  font-weight: 600;
  text-align: center;
}
.pricebar {
  font-size: 40px;
  color: #f7c59f;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}
.results {
  font-size: 30px;
  color: #f7c59f;
  flex-direction: column;
  display: flex;
  align-items: center;
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
input {
  font-size: 40px;
  height: 40px;
  width: 5em;
}
main {
  display: flex;
  flex-direction: column;
  color: #f7c59f;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
</style>
