import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const session = await client.auth.getSession();
  const { user } = session.data.session

  const { data } = await client
    .from('lists')
    .insert([
      { user_id: user.id, title: body.title },
    ])
    .select()      

  return { data }
})
