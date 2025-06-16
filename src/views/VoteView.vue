<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const price = ref(0);
const loading = ref(false);
const route = useRoute();
const router = useRouter();
const prompt = ref<any>(null);
const error = ref(null);

watch(price, (newPrice) => {
  if (newPrice > 100) {
    price.value = 100;
  } else if (newPrice < 0) {
    price.value = 0;
  } else {
    price.value = newPrice;
  }
});

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id: string | string[]) {
  prompt.value = null;
  loading.value = true;
  price.value = 0;

  try {
    // replace `getPost` with your data fetching util / API wrapper
    await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/prompt/${route.params.id}`
    )
      .then((response) => response.json())
      .then((data) => (prompt.value = data.rows[0].gameprompt));
  } catch (err: any) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

async function postData() {
  try {
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/postPrice`, {
      method: 'POST',
      body: JSON.stringify({
        id: route.params.id,
        price: price.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      router.push(`/vote/${Math.ceil(Math.random() * 100)}`);
    });
  } catch (err: any) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main>
    <div class="title">What would you pay for...</div>
    <div class="game" v-if="prompt">
      {{ prompt }}
    </div>
    <div class="pricebar">
      $<input type="number" v-model="price" /><button
        class="primary"
        @click="postData"
      >
        Submit
      </button>
    </div>
    <p>Choose a price between $0 - $100</p>
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
