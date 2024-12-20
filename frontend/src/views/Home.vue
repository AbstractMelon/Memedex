<template>
  <div class="home">
    <h1>Latest Memes</h1>
    <meme-grid :memes="store.memes" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "../store";
import MemeGrid from "../components/MemeGrid.vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: { MemeGrid },
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      store.fetchMemes();
    });

    const goToMemeDetail = (memeId) => {
      router.push(`/meme/${memeId}`); // Navigate to the meme's detail page
    };

    return { store, goToMemeDetail };
  },
};
</script>
