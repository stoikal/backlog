import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  let { data: rawData, error } = await client
    .schema('games_backlog')
    .from('lists')
    .select(`
      id,
      title,
      created_at,
      list_items (
        game_id,
        ...games (
          name,
          game_statuses (
            is_finished
          )
        )
      )
    `)
    .order('title')


  const data = rawData?.map((list) => ({
    listId: list.id,
    title: list.title,
    createdAt: list.created_at,
    items: list.list_items?.map((item) => ({
      gameId: item.game_id,
      gameTitle: item.name,
      isFinished: item.game_statuses[0]?.is_finished
    }))
  }))

  return { data }
})
