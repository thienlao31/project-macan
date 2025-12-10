<template>
  <div class="container mx-auto px-6 py-12 text-white">
    <div class="flex justify-start"> 
      <AudioPlayer 
        cover="/images/album.jpeg"
        :tracks="[
          { title: 'MACAN & Брутто - Золотые Купола', src: '/music/track1.mp3' },
          { title: 'MACAN - 21+', src: '/music/track2.mp3' },
          { title: 'MACAN - Самый Пьяный Округ В Мире', src: '/music/track3.mp3' },
          { title: 'MACAN - Плачь, Но Не Звони', src: '/music/track4.mp3' },
          { title: 'MACAN - Asphalt 8', src: '/music/track5.mp3' },
          { title: 'MACAN - Май', src: '/music/track6.mp3' },
          { title: 'MACAN - Брат', src: '/music/track7.mp3' },
          { title: 'MACAN & Jacone - Все Правильно', src: '/music/track8.mp3' },
          { title: 'MACAN - Москва Бежит', src: '/music/track9.mp3' }
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import AudioPlayer from '~/components/AudioPlayer.vue'
</script>
