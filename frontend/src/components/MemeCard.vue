<template>
  <div class="meme-card">
    <img :src="meme.imageUrl" :alt="meme.title" />
    <div class="meme-info">
      <h3>{{ meme.title }}</h3>
      <p>Posted by {{ meme.author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemeCard",
  props: {
    meme: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.meme-card {
  background: #252525;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.meme-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.meme-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.meme-info {
  padding: 1rem;
}

.meme-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.meme-info p {
  margin: 0.5rem 0 0;
  color: #666;
}
</style>
