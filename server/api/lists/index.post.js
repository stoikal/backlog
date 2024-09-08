import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const { data: { user } } = await client.auth.getUser()

  const { data } = await client
    .schema('games_backlog')
    .from('lists')
    .insert([
      { user_id: user?.id, title: body.title },
    ])
    .select()      

  return { data }
})
