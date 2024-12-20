<template>
  <div class="upload">
    <h1>Upload a Meme</h1>
    <upload-form />
  </div>
</template>

<script>
import UploadForm from "../components/UploadForm.vue";

export default {
  name: "Upload",
  components: { UploadForm },
};
</script>
