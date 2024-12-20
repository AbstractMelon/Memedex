<template>
  <div class="meme-grid">
    <div
      class="meme-card"
      v-for="meme in memes"
      :key="meme._id"
      @click="goToMemeDetail(meme._id)"
    >
      <img :src="meme.imageUrl" :alt="meme.title" />
      <div class="meme-info">
        <h3>{{ meme.title }}</h3>
        <p>Posted by {{ meme.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemeGrid",
  props: {
    memes: Array,
  },
  methods: {
    goToMemeDetail(memeId) {
      this.$router.push(`/meme/${memeId}`);
    },
  },
};
</script>

<style>
.meme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
