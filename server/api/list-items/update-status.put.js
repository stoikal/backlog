import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  const { data: { user } } = await client.auth.getUser()

  const { data } = await client
    .schema('games_backlog')
    .from('game_statuses')
    .upsert([
      { user_id: user?.id, game_id: body.gameId, is_finished: body.isFinished },
    ])
    .select()

  return { data }
})
