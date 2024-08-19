<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Form, FormItem, Button, Input, message } from 'ant-design-vue'
import { signInWithEmail } from '../client'

const router = useRouter()

const formState = reactive({
  email: '',
  password: '',
})

const onFinish = async ({ email, password }) => {
  const { error } = await signInWithEmail({ email, password })

  if (!error) {
    router.push('/')
  }
}
</script>

<template>
  <div>
    <Card>
      <Form
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
      >
        <FormItem
          label="Email"
          name="email"
        >
          <Input v-model:value="formState.email" />
        </FormItem>

        <FormItem
          label="Password"
          name="password"
        >
          <Input
            v-model:value="formState.password"
            type="password"
          />
        </FormItem>

        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
            <Button type="primary" html-type="submit">Submit</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
