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
      .get('memes/')
      .catch((error) => {
        console.log('error', error);
      })
      .then((response) => {
         allMemes.value= response?.data
      });
}
</script>
<template>
  <q-page >
    <div class="hero_banner">
        <div class="filter">
        </div>
        <div class="info">
          <h1>Creer vos propre memes en quelques secondes</h1>
          <div class="image_stores">
            <img src="public/SVG/logos-stores.svg" alt="logo_stores">
          </div>
        </div>
    </div>
    <div class="max-width cards row  justify-start wrap">
      <MemeCard
        v-for="meme in  allMemes"
        :key="meme._id"
        :data="meme"
      >
      </MemeCard>
    </div>
  </q-page>
</template>
<style lang="scss">

.hero_banner{
  position: relative;
  background: no-repeat url("public/img/car.jpg");
  min-height: 70vh;
  background-size: cover;
  background-position: top;
  width: 100%;
  display: flex;
  align-items: center;
  .info{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    max-width: 1080px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    padding: 30px 50px;
    min-height: 40vh;
    .image_stores{
      max-width: 400px;
      width: 100%;
      img{
        object-fit: cover;
      }
    }
    h1{
      font-size: 3rem;
      color: white;
      z-index: 1;
    }
  }

  .filter {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 70vh;
  }
}
.cards{
  gap: 40px;
}
</style>
