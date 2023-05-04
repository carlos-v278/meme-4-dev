<script setup lang="ts">
import { ref } from 'vue'
import {api} from 'src/utils/fetch';
import { useUserAuth } from 'src/stores/userAuth';
import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia';


const router = useRouter()
const auth = useUserAuth();
const authPassword = ref<string | null>(null)

function onSubmit():boolean {
  if ( authPassword.value != '') {
    connectUser()
    console.log('accept to send')
    return true

  }
  else {
    console.log('not accept to send')
    return false
  }
}

function onReset ():boolean {
  authPassword.value = null
  return true
}
function connectUser():void{
  api
    .post('authenticate',{password:authPassword.value})
    .catch((error) => {
      console.log('error', error);
    })
    .then((response) => {
      if(response?.data.connect){
        auth.connectUser()
        window.localStorage.setItem(
          'userConnected',
          JSON.stringify({connect:true})
        )
        router.push({ name: 'home' })

      }
    });
}

</script>

<template>
<div id="login-page" class="max-width">
  <div class="login-container">
    <h1>Login</h1>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="password"
        v-model="authPassword"
        label="Mot de passe"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' ,
        ]"
      />


      <div>
        <q-btn label="Connexion" type="submit" color="green"/>
        <q-btn label="Reset" type="reset" color="green" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</div>
</template>

<style scoped lang="scss">
.login-container{
  margin: 100px auto;
  max-width: 600px;
  h1{
    font-size: 2rem;
  }
}
</style>
