<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header class="bg-green" >
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Links } from  'src/utils/interfaces'
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
</script>

<style lang="scss">
.max-width{
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
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
