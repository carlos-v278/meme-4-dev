<script setup lang="ts">
import { ref } from 'vue'

const authId = ref<string | null>(null)
const authPassword = ref<string | null>(null)

function onSubmit():boolean {
  if (authId.value != '' &&  authPassword.value != '') {
    console.log('accept to send')
    return true

  }
  else {
    console.log('not accept to send')
    return false
  }
}

function onReset ():boolean {
  authId.value = null
  authPassword.value = null
  return true
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
        v-model="authId"
        type="mail"
        label="Identifiant"
        hint="Votre identifiant de connexion"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Champs vide']"
      />

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
