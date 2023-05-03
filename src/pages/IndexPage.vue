<template>
  <q-page class="max-width">
    <div class="cards row  justify-start wrap">
      <MemeCard
        v-for="meme in  allMemes"
        :key="meme.id"
        :data="meme"
      >
      </MemeCard>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Meme} from 'src/utils/interfaces'
import MemeCard from 'components/MemeCard.vue';

const allMemes =ref<Meme[]>([
  {
    id:'133T3TB-GE53T',
    topText:'Meilleir ezfezfezfzefzfzf',
    bottomText:'Bottom Meme',
    imageUrl:'https://picsum.photos/300/300',
  },
  {
    id:'133T5TB-FE53T',
    topText:'ezfezfz meme',
    bottomText:'ezfezfezfez Meme',
    imageUrl:'https://picsum.photos/300/300',
  },
  {
    id:'133T5TB-FE57T',
    topText:'ezfezfzfezfzefez meme',
    bottomText:'fezfezfezfez Meme',
    imageUrl:'https://picsum.photos/300/300',
  },
  {
    id:'133T5TB-FE57T',
    topText:'ezfezfzfezfzefez meme',
    bottomText:'fezfezfezfez Meme',
    imageUrl:'https://picsum.photos/300/300',
  },
])

</script>

<style lang="scss">
.cards{
  gap: 40px;
}
</style>
