<script setup lang="ts">
import {Meme} from 'src/utils/interfaces';
import type { PropType } from 'vue'
import {api} from 'src/utils/fetch';

// props declaration
const props = defineProps({
  data:{
    type: Object as PropType<Meme>
  },
  text:{
    type:Boolean,
    default:false
  }
})

// delete meme method

function deleteMeme(id:string){
  api
    .delete(`memes/delete/${id}`)
    .catch((error) => {
      console.log('error', error);
    })
    .then((response) => {
      console.log(response)
      window.location.reload()
    });
}


</script>

<template>
<div class="card">
  <q-card class="my_card" flat bordered>

    <div class="meme-image">
      <img :src="props?.data.imageUrl">
      <div v-if="props.text" class="text_content">
          <p class="header">{{ props?.data.topText }}</p>
          <p class="footer">{{ props?.data.bottomText }}</p>
      </div>
    </div>

    <q-btn
        v-if=" !props.text"
        class="btn-del"
        size="10px"
        round
        text-color="white"
        icon="close"
        @click="deleteMeme(props?.data._id)"
    >

    </q-btn>

  </q-card>
</div>
</template>

<style scoped lang="scss">
.card{
  margin: 20px 0;
  .my_card{
    overflow: hidden;
    max-width: 300px;
    width: 100%;
    height: 220px;
    position: relative;
    margin: 0 auto;
    .btn-del{
      background: rgba(0,0,0,.6);
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
    .text_content{
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p{
        text-align: center;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        width: 100%;
        min-height: 30px;
        white-space: normal;
        background: rgba(0,0,0,1);
        color: white;
      }
    }
    .meme-image{
      width: 100%;
      height: 100%;
      img{
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
