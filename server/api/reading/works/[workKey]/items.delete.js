import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const workKey = getRouterParam(event, 'workKey')
  const body = await readBody(event)
  const listIds = body.listIds

  const { data } = await client
    .schema('games_backlog')
    .from('list_items')
    .delete()
    .eq('work_key', workKey)
    .in('list_id', listIds)

  return { data }
})
