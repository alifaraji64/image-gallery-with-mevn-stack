<template>
  <div id="app">
    <ImageUploader v-bind:api="api" v-on:imageUploaded="this.newImage" />
    <ImageGallery
      server="http://localhost:3000"
      :images="images"
      v-on:remove-image="this.removeImage"
    />
  </div>
</template>

<script>
import ImageUploader from "./components/imageUploader";
import ImageGallery from "./components/imageGallery";
export default {
  name: "App",
  components: {
    ImageUploader,
    ImageGallery,
  },
  data: function () {
    return {
      api: {
        upload: "http://localhost:3000/upload",
        retrieve: "http://localhost:3000/retrieve",
        delete: "http://localhost:3000/delete",
      },
      images: [],
    };
  },
  methods: {
    newImage(image) {
      this.images.push(image);
    },
    removeImage(image) {
      let item = JSON.parse(JSON.stringify(image));
      fetch(this.api.delete + `/${item._id}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((images) => {
          this.images = images;
        });
    },
  },
  beforeMount() {
    fetch(this.api.retrieve)
      .then((res) => {
        return res.json();
      })
      .then((images) => {
        this.images = images;
      });
  },
};
</script>

<style>
</style>
