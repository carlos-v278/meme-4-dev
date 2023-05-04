<template>
  <router-view />
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import {useUserAuth} from 'stores/userAuth';
import { useRouter } from 'vue-router'
const auth = useUserAuth();

const router = useRouter()
onBeforeMount(() => {
  checkLogin()
});
function checkLogin():void{
  const connect = window.localStorage.getItem('userConnected');
 if(JSON.parse(connect).connect){
   console.log('hello')
   auth.connectUser()
 } else{
   auth.disconnectUser()
 }
  setTimeout(function(){
    window.localStorage.setItem(
      'userConnected',
      JSON.stringify({connect:false})
    )
    auth.disconnectUser()
    router.push({ name: 'home' })
  }, 3600000)
}
</script>
