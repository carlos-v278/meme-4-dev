import { useUserAuth } from 'src/stores/userAuth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useUserAuth();

const { getUserConnected } = storeToRefs(auth)
export function connect(){
  if(!getUserConnected.value){
    router.push({ name: 'login' })
  }
}
