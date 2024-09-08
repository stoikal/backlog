import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const gameId = getRouterParam(event, 'gameId')
  const body = await readBody(event)

  const { data: { user } } = await client.auth.getUser()

  const { data } = await client
    .schema('games_backlog')
    .from('game_comments  ')
    .upsert([{
      user_id: user.id,
      game_id: gameId,
      comment: body.comment,
    }])
    .select()

  return { data }
})
