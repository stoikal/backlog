import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const session = await client.auth.getSession();
  const { user } = session.data.session

  const { data } = await client
    .from('game_statuses')
    .upsert([
      { user_id: user.id, game_id: body.gameId, is_finished: body.isFinished },
    ])
    .select()

  return { data }
})
