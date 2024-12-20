<template>
  <form @submit.prevent="handleSubmit" class="upload-form">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" v-model="title" type="text" required />
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input
        id="image"
        type="file"
        @change="handleImageChange"
        accept="image/*"
        required
      />
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <button type="submit" :disabled="isUploading">
      {{ isUploading ? "Uploading..." : "Upload Meme" }}
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

export default {
  name: "UploadForm",
  setup() {
    const store = useStore();
    const router = useRouter();
    const title = ref("");
    const image = ref(null);
    const isUploading = ref(false);
    const errorMessage = ref("");

    const handleImageChange = (e) => {
      image.value = e.target.files[0];
    };

    const handleSubmit = async () => {
      if (!image.value) {
        errorMessage.value = "Please select an image to upload.";
        return;
      }

      errorMessage.value = "";
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("image", image.value);

      isUploading.value = true;
      const { success, error } = await store.uploadMeme(formData);
      isUploading.value = false;

      if (success) {
        router.push("/");
      } else if (error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = "Failed to upload the meme. Please try again.";
      }
    };

    return {
      title,
      isUploading,
      errorMessage,
      handleImageChange,
      handleSubmit,
    };
  },
};
</script>

<style>
.upload-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #252525;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}
</style>
