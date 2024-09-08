import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const { data: { user } } = await client.auth.getUser()

  const { data, error } = await client
    .schema('reading_backlog')
    .from('lists')
    .insert([
      { user_id: user?.id, title: body.title },
    ])
    .select()      

  return { data,error }
})
