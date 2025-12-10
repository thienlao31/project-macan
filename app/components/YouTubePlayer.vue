<template>
  <div class="w-full max-w-3xl aspect-video border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0&controls=1&modestbranding=1&color=white`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  videoId: String
})
</script>
