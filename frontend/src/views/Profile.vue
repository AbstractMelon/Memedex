<template>
  <div class="profile">
    <h1>My Memes</h1>
    <meme-grid v-if="userMemes.length" :memes="userMemes" />
    <p v-else>You haven't uploaded any memes yet!</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "../store";
import MemeGrid from "../components/MemeGrid.vue";

export default {
  name: "Profile",
  components: { MemeGrid },
  setup() {
    const store = useStore();
    const userMemes = computed(() =>
      store.memes.filter((meme) => meme.userId === store.user?._id)
    );

    return { userMemes };
  },
};
</script>
