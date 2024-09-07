<script setup>
import { LogOut } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';

useHead({
  title: 'Personal Site',
  meta: [
    { name: 'description', content: 'Personal Site' }
  ],
  bodyAttrs: {
    class: 'dark',
  },
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const logoutAndRedirect = async () => {
  await supabase.auth.signOut();
  navigateTo({ path: '/login' })
}
</script>

<template> 
  <a-config-provider>
    <header>
      <div class="text-end p-4">
        <template v-if="user">
          <Button
            class="rounded-full"
            size="icon"
            @click="logoutAndRedirect"
          >
            <LogOut />
          </Button>
        </template>
      </div>
    </header>
    <div>
      <main>
        <NuxtPage />
      </main>
    </div>
  </a-config-provider>
</template>
