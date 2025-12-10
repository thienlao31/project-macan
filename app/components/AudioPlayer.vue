<template>
  <div class="bg-black/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 w-full max-w-xl">
    
    <!-- Обложка -->
    <img 
      :src="cover" 
      alt="album cover" 
      class="w-64 h-64 object-cover rounded-xl mx-auto shadow-[0_0_25px_#22ff55]"
    >

    <!-- Название альбома -->
    <h2 class="text-center text-3xl text-green-400 font-bold mt-4 mb-6 drop-shadow-[0_0_15px_#22ff55]">
      {{ album }}
    </h2>

    <!-- Плейлист -->
    <ul class="space-y-2">
      <li 
        v-for="(track, index) in tracks" 
        :key="index"
        @click="playTrack(index)"
        class="p-3 rounded-lg cursor-pointer transition flex justify-between border bg-black/40 hover:bg-black/60"
        :class="{
          'border-green-400 text-green-300 shadow-[0_0_15px_#22ff55]': currentIndex === index,
          'border-gray-700': currentIndex !== index
        }"
      >
        <span>{{ track.title }}</span>
        <span v-if="currentIndex === index && !paused">⏸</span>
        <span v-else>▶</span>
      </li>
    </ul>

    <!-- Аудио -->
    <audio ref="audio" @ended="nextTrack"></audio>
    <!-- ПРОГРЕСС-БАР -->
<div class="mt-6">
<!-- Название играющего трека -->
<div class="text-center text-green-400 text-xl font-semibold mb-2 drop-shadow-[0_0_10px_#22ff55]">
  {{ tracks[currentIndex].title }}
</div>

  <div 
    class="w-full h-2 bg-gray-700 rounded cursor-pointer relative"
    @click="seek($event)"
  >
    <div 
      class="h-2 bg-green-400 rounded absolute left-0 top-0 transition-all duration-100"
      :style="{ width: progress + '%' }"
    ></div>
  </div>

  <div class="flex justify-between text-sm text-gray-300 mt-2">
    <span>{{ formatTime(currentTime) }}</span>
    <span>{{ formatTime(duration) }}</span>
  </div>
</div>


    <!-- Кнопки управления -->
    <div class="flex justify-center mt-6 gap-4">
      <button @click="prevTrack" class="px-4 py-2 bg-green-400 text-black rounded-lg">⏮</button>
      <button @click="togglePlay" class="px-6 py-2 bg-green-400 text-black rounded-lg">
        {{ paused ? 'Play' : 'Pause' }}
      </button>
      <button @click="nextTrack" class="px-4 py-2 bg-green-400 text-black rounded-lg">⏭</button>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
function formatTime(sec) {
  if (!sec && sec !== 0) return "00:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}


const props = defineProps({
  cover: String,
  album: String,
  tracks: Array
})

const audio = ref(null)
const currentIndex = ref(0)
const paused = ref(true)
// Progress bar state
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

// Обновляем прогресс во время проигрывания
function updateProgress() {
  currentTime.value = audio.value.currentTime
  duration.value = audio.value.duration || 0
  progress.value = (currentTime.value / duration.value) * 100
}

// Перемотка по клику
function seek(event) {
  const rect = event.target.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const width = rect.width
  const newTime = (clickX / width) * duration.value
  audio.value.currentTime = newTime
}

watch(currentIndex, () => {
  loadTrack()
  audio.value.play()
  paused.value = false
})

function loadTrack() {
  audio.value.src = props.tracks[currentIndex.value].src
}

function playTrack(index) {
  currentIndex.value = index
}

function togglePlay() {
  if (paused.value) audio.value.play()
  else audio.value.pause()
  paused.value = !paused.value
}

function nextTrack() {
  currentIndex.value = (currentIndex.value + 1) % props.tracks.length
}

function prevTrack() {
  currentIndex.value = (currentIndex.value - 1 + props.tracks.length) % props.tracks.length
}

onMounted(loadTrack)
onMounted(() => {
  loadTrack()
  audio.value.addEventListener('timeupdate', updateProgress)
})

</script>
