<script setup>
import { LogoutOutlined } from '@ant-design/icons-vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const logoutAndRedirect = async () => {
  await supabase.auth.signOut();
  navigateTo({ path: '/login' })
}
</script>

<template> 
  <a-config-provider>
    <a-layout
      style="min-height: 100vh;"
    >
      <a-layout-header>
        <a-row justify="end">
          <a-col>
            <template v-if="user">
              <a-button
                shape="circle"
                @click="logoutAndRedirect"
              >
                <template #icon>
                  <LogoutOutlined />
                </template>
              </a-button>
            </template>
          </a-col>
        </a-row>
      </a-layout-header>
  
      <a-layout-content
        style="padding: 2rem"
      >
        <NuxtPage />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>
