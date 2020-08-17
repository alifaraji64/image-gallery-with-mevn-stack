<template>
  <div>
    <label for="title">Image title:</label>
    <input type="text" name="title" id="title" />
    <br />
    <br />
    <label for="image">Upload Image:</label>
    <input type="file" name="image" id="image" />
    <br />
    <br />
    <button @click="uploadForm">Upload</button>
  </div>
</template>

<script>
export default {
  porps: ["api"],
  data() {},
  methods: {
    uploadForm() {
      let title = document.querySelector("#title").value;
      let image = document.querySelector("#image").files[0];
      let payload = new FormData();
      payload.append("title", title);
      payload.append("image", image);
      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: payload,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.$emit("imageUploaded", data);
          title = "";
        })
        .catch((err) => {
          console.log(err + " hey");
        });
    },
  },
};
</script>

<style>
</style>