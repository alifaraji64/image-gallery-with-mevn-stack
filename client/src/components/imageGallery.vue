<template>
  <div class="gallery">
    <div class="image" v-for="image in images" :key="image._id">
      <img :src=" server+ '/image/' + image.filename " alt />
      <button class="remove" @click="$emit('remove-image',image)">X</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images", "server"],
};
</script>

<style>
.gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 760px;
  margin: auto;
}
.image {
  max-width: 50%;
  position: relative;
  padding: 12px;
}
img {
  width: 100%;
  display: block;
  filter: grayscale();
}
img:hover {
  filter: none;
}
.remove {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 28px;
  border: none;
  background: transparent;
  right: 30px;
  cursor: pointer;
}
</style>