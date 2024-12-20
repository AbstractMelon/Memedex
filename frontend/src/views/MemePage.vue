<template>
  <div class="meme-page">
    <div v-if="meme" class="meme-container">
      <h1 class="meme-title">{{ meme.title }}</h1>
      <p class="meme-author">Posted by {{ meme.author }}</p>
      <img :src="meme.imageUrl" :alt="meme.title" class="meme-image" />

      <div class="meme-actions">
        <button @click="downloadMeme" class="meme-action-btn download-btn">
          Download
        </button>
        <button @click="shareMeme" class="meme-action-btn share-btn">
          Share
        </button>
        <a :href="'/meme/' + meme._id" class="meme-action-btn direct-link">
          Direct Link
        </a>
      </div>
    </div>
    <div v-else>
      <p>Loading meme details...</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "MemePage",
  setup() {
    const meme = ref(null);
    const route = useRoute();
    const memeId = route.params.id;

    onMounted(async () => {
      try {
        const response = await axios.get(`/api/memes/${memeId}`);
        meme.value = response.data;
      } catch (error) {
        console.error("Error fetching meme details:", error);
      }
    });

    const downloadMeme = () => {
      const link = document.createElement("a");
      link.href = meme.value.imageUrl;
      link.download = meme.value.title;
      link.click();
    };

    const shareMeme = () => {
      if (navigator.share) {
        navigator
          .share({
            title: meme.value.title,
            text: "Check out this meme!",
            url: window.location.href,
          })
          .catch((error) => console.error("Error sharing meme:", error));
      } else {
        alert("Sharing not supported on this device");
      }
    };

    return {
      meme,
      downloadMeme,
      shareMeme,
    };
  },
};
</script>

<style scoped>
.meme-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.meme-container {
  background-color: #252525;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: fit-content;
  max-width: 800px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.meme-title {
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.meme-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.meme-image:hover {
  transform: scale(1.05);
}

.meme-author {
  font-size: 1rem;
  color: #888;
  margin-top: 10px;
}

.meme-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.meme-action-btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
</style>
