<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
         <div class="logo">
           <img :src="require('')" alt="">
         </div>
        </q-toolbar-title>

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
.link{
  color: black;
  text-decoration: none;
}
</style>
