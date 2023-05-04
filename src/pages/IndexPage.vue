<template>
  <q-page class="max-width">
    <div class="cards row  justify-start wrap">
      <MemeCard
        v-for="meme in  allMemes"
        :key="meme._id"
        :data="meme"
      >
      </MemeCard>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref,onBeforeMount } from 'vue';
import {Meme} from 'src/utils/interfaces'
import MemeCard from 'components/MemeCard.vue';
import {api} from 'src/utils/fetch';
import { useUserAuth } from 'src/stores/userAuth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'


const router = useRouter()
const auth = useUserAuth();
const { getUserConnected } = storeToRefs(auth)

//lifes cycles
onBeforeMount(() => {
  if(getUserConnected.value){
    getAllMemes()
    console.log(allMemes.value)
  } else{
    router.push({ name: 'login' })
  }

});


const allMemes =ref<Meme[]>([])

function getAllMemes():void{
    api
      .get('/')
      .catch((error) => {
        console.log('error', error);
      })
      .then((response) => {
         allMemes.value= response?.data
      });
}
</script>

<style lang="scss">
.cards{
  gap: 40px;
}
</style>
