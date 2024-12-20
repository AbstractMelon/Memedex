<template>
  <div class="random">
    <h1>Random Meme</h1>
    <div v-if="currentMeme" class="random-meme">
      <meme-card :meme="currentMeme" />
      <button @click="getRandomMeme" class="random-btn">
        Get Another Meme
      </button>
    </div>
    <p v-else>No memes available!</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store";
import MemeCard from "../components/MemeCard.vue";

export default {
  name: "Random",
  components: { MemeCard },
  setup() {
    const store = useStore();
    const currentMeme = ref(null);

    const getRandomMeme = () => {
      const memes = store.memes;
      if (memes.length) {
        const randomIndex = Math.floor(Math.random() * memes.length);
        currentMeme.value = memes[randomIndex];
      }
    };

    getRandomMeme();

    return {
      currentMeme,
      getRandomMeme,
    };
  },
};
</script>

<style>
.random-meme {
  max-width: 500px;
  margin: 0 auto;
}

.random-btn {
  display: block;
  width: 100%;
  margin-top: 1rem;
}
</style>
