<script setup lang="ts">
import {onBeforeMount, reactive, ref, watch} from 'vue'
import MemeCard from 'components/MemeCard.vue';
import {api} from'src/utils/fetch'
import { useRouter } from 'vue-router'
import { useUserAuth } from 'src/stores/userAuth';
import { storeToRefs } from 'pinia';
import {Meme} from 'src/utils/interfaces'

const auth = useUserAuth();
const { getUserConnected } = storeToRefs(auth)

const router = useRouter()
const textTop = ref<string | null>(null)
const textBottom = ref<string| null>(null)

const uploadFile = ref<T>(null)
const imagePrev = ref<T>(null)

let meme = ref< undefined | Meme>(undefined)

onBeforeMount(() => {
  if(!getUserConnected.value){
    router.push({ name: 'login' })
  }

});
function onSubmit():boolean  {
  if (textTop.value != '' &&  textBottom.value != '') {
    console.log('accept to send')
    postMeme()
    return true
  }
  else {
    console.log('not accept to send')
    return false
  }
}


function onReset ():boolean {
  textTop.value = null
  textBottom.value = null
  // uploadFile.value = null

  return true
}

function postMeme():void{
  let formData = new FormData()
  formData.append("topText",textTop.value)
  formData.append("bottomText",textBottom.value)
  formData.append("image",uploadFile.value)
  api
    .post('memes/create', formData)
    .catch((error) => {
      console.log('error', error);
    })
    .then((response) => {
     console.log(response)
      router.push({ name: 'home' })
    });
}

watch(uploadFile,  () => {
  imagePrev.value = URL.createObjectURL(uploadFile.value)

  meme.value = {
    _id:1,
    topText:textTop.value,
    bottomText:textBottom.value,
    imageUrl:imagePrev.value,
  }
  console.log(meme.value)
})


</script>

<template>
  <div id="upload-page" class="max-width">
    <div class="upload-container">
      <h1 class="h1">Uploader vos memes.</h1>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="textTop"
          type="text"
          label="Texte en haut du meme"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Champs vide']"
        />

        <q-input
          filled
          v-model="textBottom"
          type="text"
          label="Texte en bas du meme"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Champs vide']"
        />
        <q-file color="white"  filled v-model="uploadFile" label="Fichier">
          <template v-slot:prepend>
            <q-icon name="attachment" />
          </template>
        </q-file>

        <div>
          <q-btn label="Uploader" type="submit" color="dark"/>
          <q-btn label="Reset" type="reset" color="dark" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
    <div class="pre-view">
      <MemeCard v-if="meme != undefined" :data="meme" :text="true" ></MemeCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-container{
  margin: 100px auto;
  max-width: 600px;
  h1{
    font-size: 2rem;
    line-height: 4rem;
    margin: 30px 0;
  }
}
</style>
