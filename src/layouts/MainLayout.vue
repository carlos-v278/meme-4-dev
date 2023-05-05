<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header class="bg-dark" >
      <q-toolbar class="row items-center" >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="row items-center">
         <div class="logo">
           <img src="public/img/logo.png" alt="logo">
         </div>

        </q-toolbar-title>
        <ul class="nav_links">
          <li
            v-for="(link,index) in appLinks"
            :key="index"
            class="nav_link"
          >
            <router-link
              class="link"
              :to="{name:link?.pathName, to:link?.to}"
            >
              {{ link.name }}
            </router-link>

          </li>
          <li class="nav_link">
            <q-btn
              flat
              dense
              icon="logout"
              size="sm"
              aria-label="Menu"
              @click="deconnect()"
            />
          </li>
        </ul>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list class=" ">
        <q-item-label
          header
        >
          Dashboard
        </q-item-label>

       <q-item
         v-for="(link,index) in appLinks"
         :key="index"
       >
         <router-link
           class="link"
           :to="{name:link?.pathName, to:link?.to}"
         >
           {{ link.name }}
         </router-link>
       </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="padding_0">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Links } from  'src/utils/interfaces'
import {useUserAuth} from 'stores/userAuth';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()
const auth = useUserAuth();
const appLinks = ref<Links[]>([
  {
    name:'Accueil',
    pathName:"home",
    to:undefined
  },
  {
    name:'Nouveau meme',
    pathName:"new_content",
    to:undefined
  },
  {
    name:'Login',
    pathName:"login",
    to:undefined
  },

])

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function deconnect():void{
  auth.disconnectUser()
  window.localStorage.setItem(
    'userConnected',
    JSON.stringify({connect:false})
  )
  triggerPositive()
  router.push({ name: 'login' })
}
function triggerPositive (){
  $q.notify({
    type: 'positive',
    message: 'Vous êtes bien déconnecté '
  })
}
</script>

<style lang="scss">
.max-width{
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
}
.padding_0{
  padding: 0 !important;
}
.logo{
  margin: 5px 10px;
  max-width: 60px;
  max-height: 50px;
  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.link{
  color: black;
  text-decoration: none;
}
.nav_links{
  display: flex;
  gap: 20px;
  li{
    list-style: none;
    a{
      color: white;
    }
  }
}
</style>
