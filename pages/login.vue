<script setup>
import { reactive } from 'vue'

definePageMeta({ middleware: 'auth' })

const supabase = useSupabaseClient()

const formState = reactive({
  email: '',
  password: '',
})

const onFinish = async ({ email, password }) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (!error) {
    navigateTo({ path: '/backlog/games' })
  }
}
</script>
<template>
  <a-row justify="center">
    <a-col>
      <a-card style="width: 500px">
        <a-form
          :model="formState"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 24 }"
          @finish="onFinish"
        >
          <a-form-item
            label="Email"
            name="email"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>
  
          <a-form-item
            label="Password"
            name="password"
          >
            <a-input
              v-model:value="formState.password"
              type="password"
            />
          </a-form-item>
          
          <a-row justify="end">
            <a-col>
              <a-form-item>
                  <a-button type="primary" html-type="submit">Submit</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>